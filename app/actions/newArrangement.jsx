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
      // Prepare Insert Query
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
          // Handle this case appropriately
          return;
        }

        const managerID = managerResult[0][0].Reporting_Manager;

        // Get the email of the reporting manager
        const getEmailQuery = `
        SELECT Email FROM Employee
        WHERE Staff_ID = ?
        `;
        const emailResult = await conn.query(getEmailQuery, managerID);

        if (!emailResult) {
          console.error(`No email found for reporting manager ID ${managerID}`);
          // Handle this case appropriately
          return;
        }

        const managerEmail = emailResult[0][0].Email;

        // Prepare email content
        const subject = "New WFH Request Submitted";
        const body = `Dear Manager/Director,\n\n
        A new work-from-home arrangement has been submitted:\n\n
        Staff ID: ${staffID}\n
        Start Date: ${startDate}\n
        Apply Reason: ${applyReason || "N/A"}\n\n
        Please review and approve/reject the request, thank you. \n\n`;

        // Send notification using Mailtrap
        console.log(managerEmail);
        await sendNotification(managerEmail, subject, body);
        // ----End of Notification----
      } catch (error) {
        console.error("Error during arrangement setup", error);
        // Handle error
      }
    } else if (arrangementType === "Recurring") {
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
        console.error(`No reporting manager found for staff ID ${staffID}`);
        // Handle this case appropriately
        return;
      }

      const managerID = managerResult[0][0].Reporting_Manager;

      // Get the email of the reporting manager
      const getEmailQuery = `
        SELECT Email FROM Employee
        WHERE Staff_ID = ?
        `;
      const emailResult = await conn.query(getEmailQuery, managerID);

      if (!emailResult) {
        console.error(`No email found for reporting manager ID ${managerID}`);
        // Handle this case appropriately
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
      const body = `Dear Manager/Director,\n\n
     A new recurring work-from-home arrangement has been submitted:\n\n
     Staff ID: ${staffID}\n
     Date(s): ${formattedDates}\n
     End Date: ${endDate}\n
     Recurring Interval: ${recurringInterval}\n
     Apply Reason: ${applyReason || "N/A"}\n\n
     Please review and approve/reject the request. \n\n`;

      // Send notification using Mailtrap
      await sendNotification(managerEmail, subject, body);
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
