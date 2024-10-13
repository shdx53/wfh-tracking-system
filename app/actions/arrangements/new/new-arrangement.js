"use server";

// Library
import connection from "@/app/lib/db";
import { sendNotification } from "@/app/lib/notificationService.js";
import { addMonths, addWeeks } from "date-fns";

// Helper function to calculate next occurrence date
const calculateNextDate = (startDate, recurringInterval, count) => {
  /* console.log("calculateNextDate:", { startDate, recurringInterval, count }); */

  switch (recurringInterval) {
    // console log the input here to test
    case "Weekly":
      return addWeeks(startDate, count);
    case "Monthly":
      return addMonths(startDate, count);
    default:
      return startDate; // fallback for custom interval
  }
};

export async function newArrangement(formData) {
  let conn;
  try {
    const pool = await connection();
    const conn = await pool.getConnection();

    const {
      staffID,
      arrangementType,
      startDate,
      shiftType,
      applyReason,
      recurringInterval,
      endDate,
    } = formData;
    /* console.log("FormData:");
    console.log(`${staffID},
      ${arrangementType},
      ${startDate},
      ${shiftType},
      ${applyReason},
      ${recurringInterval},
      ${endDate}`); */

    const isRecurring = arrangementType === "Ad-hoc" ? 0 : 1;

    if (arrangementType === "Ad-hoc") {
      if (staffID === "130002") {
        // Check if it is Jack Sim's Request -> Auto approve
        const query = `
          INSERT INTO Arrangement 
          (Staff_ID, Request_Status, Start_Date, Is_Recurring, Apply_Reason, Shift_Type)
          VALUES (?, ?, ?, ?, ?, ?)
          `;
        try {
          // Add arrangement record to Arrangement table
          await conn.execute(query, [
            staffID,
            "approved",
            startDate,
            isRecurring,
            applyReason === "" ? null : applyReason,
            shiftType,
          ]);
        } catch (error) {
          console.error("Error during arrangement setup for Jack Sim", error);
        }
      } else {
        // Others -> Set to pending status
        const query = `
          INSERT INTO Arrangement 
          (Staff_ID, Start_Date, Is_Recurring, Apply_Reason, Shift_Type)
          VALUES (?, ?, ?, ?, ?)
          `;

        try {
          // Add arrangement record to Arrangement table
          await conn.execute(query, [
            staffID,
            startDate,
            isRecurring,
            applyReason === "" ? null : applyReason,
            shiftType,
          ]);

          // ----Preparation for Notification----
          // Get the reporting manager's ID for the current staff
          const managerResult = await conn.query(
            `
          SELECT Reporting_Manager FROM Employee
          WHERE Staff_ID = ?
          `,
            staffID,
          );

          if (!managerResult) {
            console.error(`No reporting manager found for staff ID ${staffID}`);
            return;
          }

          const managerID = managerResult[0][0].Reporting_Manager;

          // Get the email of the reporting manager
          const emailResult = await conn.query(
            `
          SELECT Email FROM Employee
          WHERE Staff_ID = ?
          `,
            managerID,
          );

          if (!emailResult) {
            console.error(
              `No email found for reporting manager staffID ${managerID}`,
            );
            return;
          }

          const managerEmail = emailResult[0][0].Email;

          // Prepare email content
          const subject = "New WFH Request Submitted";
          const body = `Dear Manager/Director ${managerID} (${managerEmail}),\n
          A new work-from-home arrangement has been submitted:\n
          Staff ID: ${staffID}\n
          Start Date: ${startDate}\n
          Apply Reason: ${applyReason || "N/A"}\n\n
          Please review and approve/reject the request, thank you. \n\n`;

          // Send notification using Mailtrap
          console.log(
            `Email for WFH request sent successfully to ${managerEmail}.`,
          );
          await sendNotification(subject, body);
          // ----End of Notification----
        } catch (error) {
          console.error("Error during arrangement setup", error);
        }
      }
    } else if (arrangementType === "Recurring") {
      if (staffID === "130002") {
        // For Jack Sim

        // Query for add arrangement record to Arrangement table
        const query = `
        INSERT INTO Arrangement 
        (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Shift_Type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const startDateObj = new Date(startDate);
        let count = 0;
        let occurrenceDateObj = startDateObj;
        const endDateObj = new Date(endDate);

        // Recurring Logic to add a record for every Recurring_Interval until pointer reaches End_Date
        while (occurrenceDateObj <= endDateObj) {
          await conn.execute(query, [
            staffID,
            "approved",
            occurrenceDateObj.toISOString().split("T")[0],
            isRecurring,
            recurringInterval,
            endDate,
            applyReason === "" ? null : applyReason,
            shiftType,
          ]);

          // Calculate next occurrence date
          occurrenceDateObj = calculateNextDate(
            startDateObj,
            recurringInterval,
            ++count,
          );
        }
      } else {
        // For all other staff

        // ----Email Setup----
        const allDates = [];

        // Get the reporting manager's ID for the current staff
        const managerResult = await conn.query(
          `
          SELECT Reporting_Manager FROM Employee
          WHERE Staff_ID = ?
          `,
          staffID,
        );
        if (!managerResult) {
          console.error(`No reporting manager found for staffID ${staffID}`);
          return;
        }
        const managerID = managerResult[0][0].Reporting_Manager;

        // Get the email of the reporting manager
        const emailResult = await conn.query(
          `
          SELECT Email FROM Employee
          WHERE Staff_ID = ?
          `,
          managerID,
        );
        if (!emailResult) {
          console.error(
            `No email found for reporting manager staffID ${managerID}`,
          );
          return;
        }
        const managerEmail = emailResult[0][0].Email;

        // Prepare email content once for all recurring requests
        const subject = "New Recurring WFH Request Submitted";

        // Query for add arrangement record to Arrangement table
        const query = `
        INSERT INTO Arrangement 
        (Staff_ID, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Shift_Type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const startDateObj = new Date(startDate);
        let count = 0;
        let occurrenceDateObj = startDateObj;
        const endDateObj = new Date(endDate);

        // Recurring Logic to add a record for every Recurring_Interval until pointer reaches End_Date
        while (occurrenceDateObj <= endDateObj) {
          await conn.execute(query, [
            staffID,
            occurrenceDateObj.toISOString().split("T")[0],
            isRecurring,
            recurringInterval,
            endDate,
            applyReason === "" ? null : applyReason,
            shiftType,
          ]);

          allDates.push(occurrenceDateObj.toISOString().split("T")[0]);

          // Calculate next occurrence date
          occurrenceDateObj = calculateNextDate(
            startDateObj,
            recurringInterval,
            ++count,
          );
        }

        // Create a comma-separated string of dates
        const formattedDates = allDates.join(", ");

        // Prepare email body using the formatted dates
        const body = `Dear Manager/Director ${managerID} (${managerEmail}),\n
        A new recurring work-from-home arrangement has been submitted:\n\n
        Staff ID: ${staffID}\n
        Date(s): ${formattedDates}\n
        End Date: ${endDate}\n
        Recurring Interval: ${recurringInterval}\n
        Apply Reason: ${applyReason || "N/A"}\n\n
        Please review and approve/reject the request. \n\n`;

        // Send notification using Mailtrap
        console.log(
          `Email for WFH requests sent successfully to ${managerEmail}.`,
        );
        await sendNotification(subject, body);
      }
    }

    // Release connection back to pool
    conn.release();

    return {
      message: "Arrangement(s) added successfully",
    };
  } catch (error) {
    return {
      message: "Failed to add arrangement",
    };
  } finally {
    if (conn) conn.release();
  }
}

// For reference from previous route.js in api/arrangement
// Sample JSON Data:
/* {
  "Arrangement_ID": null,
  "Staff_ID": 150085,
  "Request_Status": "pending",
  "Applied_Datetime": "2024-03-15 10:00:00",
  "Start_Date": "2024-09-25",
  "Recurring": true,
  "Recurring_Interval": "weekly",
  "End_Date": "2024-10-25",
  "Apply_Reason": "TESTING New Code",
  "Update_Reason": null,
  "Shift_Type": "AM"
} */
