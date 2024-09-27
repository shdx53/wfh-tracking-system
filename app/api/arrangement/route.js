import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
import { addWeeks, addMonths, differenceInHours } from "date-fns";
// date-fns for time calculations
import { sendNotification } from "@/app/lib/notificationService.js";

// API Endpoint: api/arrangement
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

// Handle POST request to add a work-from-home arrangement
export async function POST(request) {
  try {
    const pool = await connection();
    const conn = await pool.getConnection();

    const {
      Arrangement_ID,
      Staff_ID,
      Request_Status,
      Applied_Datetime,
      Start_Date,
      Recurring,
      Recurring_Interval,
      End_Date,
      Apply_Reason,
      Update_Reason,
      Shift_Type,
    } = await request.json();

    // Step 1: Validate that the WFH request is at least 24 hours before the WFH date
    const currentDateTime = new Date();
    const requestedWFHDate = new Date(Start_Date);

    if (differenceInHours(requestedWFHDate, currentDateTime) < 24) {
      // Reject the request if it's less than 24 hours in the future
      return NextResponse.json(
        {
          error: "WFH requests must be submitted at least 24 hours in advance.",
        },
        { status: 400 },
      );
    }

    // Step 2: Helper function to calculate next occurrence date
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

    // Step 3: Prepare base query for inserting arrangements
    const query = `
      INSERT INTO Arrangement 
      (Arrangement_ID, Staff_ID, Request_Status, Applied_Datetime, Start_Date, Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Step 4: Non-recurring case: just insert one arrangement
    if (!Recurring) {
      await conn.execute(query, [
        Arrangement_ID || null, // Auto-increment
        Staff_ID,
        Request_Status,
        Applied_Datetime,
        Start_Date,
        Recurring,
        Recurring_Interval || null,
        End_Date || null, // Handle null End_Date
        Apply_Reason,
        Update_Reason || null, // Handle null Update_Reason
        Shift_Type,
      ]);
    } else {
      // Step 5: Recurring case: insert multiple records based on End_Date
      const startDate = new Date(Start_Date);
      let count = 0;
      let occurrenceDate = startDate;

      // Scenario 2: Use End_Date to determine how long to keep creating records
      const endDate = new Date(End_Date);

      while (occurrenceDate <= endDate) {
        await conn.execute(query, [
          Arrangement_ID || null,
          Staff_ID,
          Request_Status,
          Applied_Datetime,
          occurrenceDate.toISOString().split("T")[0],
          Recurring,
          Recurring_Interval,
          End_Date,
          Apply_Reason,
          Update_Reason || null,
          Shift_Type,
        ]);

        // Calculate next occurrence date
        occurrenceDate = calculateNextDate(
          startDate,
          Recurring_Interval,
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
    Staff ID: ${Staff_ID}\n
    Start Date: ${Start_Date}\n
    Apply Reason: ${Apply_Reason}\n\n
    Please review and approve/reject the request.\n\n
    `;

    await sendNotification(managerEmail, subject, body);

    return NextResponse.json(
      { message: "Work-from-home arrangement(s) added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding arrangement:", error);
    return NextResponse.json(
      { error: "Failed to add arrangement" },
      { status: 500 },
    );
  }
}
