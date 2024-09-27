"use server";

// Library
import connection from "@/app/lib/db";
import { sendNotification } from "@/app/lib/notificationService.js";
import { addMonths, addWeeks } from "date-fns";

// Helper function to calculate next occurrence date
const calculateNextDate = (startDate, frequency, count) => {
  switch (frequency) {
    case "weekly":
      return addWeeks(startDate, count);
    case "monthly":
      return addMonths(startDate, count);
    default:
      return startDate; // fallback for custom frequency
  }
};

export async function newArrangement(formData) {
  try {
    const pool = await connection();
    const conn = await pool.getConnection();

    const {
      staffID,
      arrangementType,
      startDate,
      shiftType,
      applyReason,
      recurringFrequency,
      endDate,
    } = formData;

    const isRecurring = arrangementType === "Ad-hoc" ? 0 : 1;

    if (arrangementType === "Ad-hoc") {
      const query = `
          INSERT INTO Arrangement 
          (Staff_ID, Start_Date, Is_Recurring, Apply_Reason, Shift_Type)
          VALUES (?, ?, ?, ?, ?)
      `;

      await conn.execute(query, [
        staffID,
        startDate,
        isRecurring,
        applyReason === "" ? null : applyReason,
        shiftType,
      ]);
    } else if (arrangementType === "Recurring") {
      const query = `
          INSERT INTO Arrangement 
          (Staff_ID, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Shift_Type)
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      // Recurring case: insert multiple records based on End_Date
      const startDateObj = new Date(startDate);
      let count = 0;
      let occurrenceDateObj = startDateObj;

      // Scenario 2: Use End_Date to determine how long to keep creating records
      const endDateObj = new Date(endDate);

      while (occurrenceDateObj <= endDateObj) {
        console.log(occurrenceDateObj.toISOString().split("T")[0]);

        // * THE CODE BELOW IS PURPOSELY COMMENTED OUT *
        // * PROCEED TO UNCOMMENT WHEN THE ISSUE IS FIXED *
        
        //   await conn.execute(query, [
        //     staffID,
        //     occurrenceDateObj.toISOString().split("T")[0],
        //     isRecurring,
        //     recurringFrequency,
        //     endDate,
        //     applyReason === "" ? null : applyReason,
        //     shiftType,
        //   ]);

        // Calculate next occurrence date
        occurrenceDateObj = calculateNextDate(
          startDateObj,
          recurringFrequency,
          ++count,
        );
      }
    }

    // Release connection back to pool
    conn.release();

    // Send out notifications
    const managerEmail = "manager@example.com"; // Replace with actual email

    const subject = "New WFH Request Submitted";
    const body = `Dear Manager/Director,\n\n
        A new work-from-home arrangement has been submitted:\n\n
        Staff ID: ${staffID}\n
        Start Date: ${startDate}\n
        Apply Reason: ${applyReason}\n\n
        Please review and approve/reject the request.\n\n
        `;

    await sendNotification(managerEmail, subject, body);

    return {
      message: "Arrangement(s) added successfully",
    };
  } catch (error) {
    return {
      message: "Failed to add arrangement",
    };
  }
}
