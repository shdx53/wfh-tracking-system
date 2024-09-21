import connection from "@/lib/db";
import { NextResponse } from "next/server";
import { addDays, addWeeks, addMonths } from "date-fns"; // date-fns to manipulate dates

// API Endpoint: api/arrangement
// Sample JSON Data:
/* {
  "Arrangement_ID": null,
  "Staff_ID": 150085,
  "Request_Status": "pending",
  "Applied_Datetime": "2024-03-15 10:00:00",
  "Start_Date": "2024-09-21",
  "Recurring": true,
  "Recurring_Freq": "weekly",
  "Occurrences_Count": 4,
  "End_Date": null,
  "Apply_Reason": "TESTING AGAINN",
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
      Recurring_Freq,
      Occurrences_Count,
      End_Date,
      Apply_Reason,
      Update_Reason,
      Shift_Type,
    } = await request.json();

    // Helper function to calculate next occurrence date
    const calculateNextDate = (startDate, frequency, count) => {
      switch (frequency) {
        case "daily":
          return addDays(startDate, count);
        case "weekly":
          return addWeeks(startDate, count);
        case "monthly":
          return addMonths(startDate, count);
        default:
          return startDate; // fallback for custom frequency
      }
    };

    // Prepare base query for inserting arrangements
    const query = `
      INSERT INTO Arrangement 
      (Arrangement_ID, Staff_ID, Request_Status, Applied_Datetime, Start_Date, Recurring, Recurring_Freq, Occurrences_Count, End_Date, Apply_Reason, Update_Reason, Shift_Type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Non-recurring case: just insert one arrangement
    if (!Recurring) {
      await conn.execute(query, [
        Arrangement_ID || null, // Auto-increment
        Staff_ID,
        Request_Status,
        Applied_Datetime,
        Start_Date,
        Recurring,
        Recurring_Freq || null,
        Occurrences_Count || null,
        End_Date || null, // Handle null End_Date
        Apply_Reason,
        Update_Reason || null, // Handle null Update_Reason
        Shift_Type,
      ]);
    } else {
      // Recurring case: insert multiple records based on frequency and count/end date
      const startDate = new Date(Start_Date);
      let count = 0;
      let occurrenceDate = startDate;

      // Scenario 1: Use Occurrences_Count to limit the number of entries
      if (Occurrences_Count) {
        while (count < Occurrences_Count) {
          await conn.execute(query, [
            Arrangement_ID || null,
            Staff_ID,
            Request_Status,
            Applied_Datetime,
            occurrenceDate.toISOString().split("T")[0], // Format the date as YYYY-MM-DD
            Recurring,
            Recurring_Freq,
            Occurrences_Count,
            End_Date || null,
            Apply_Reason,
            Update_Reason || null,
            Shift_Type,
          ]);

          // Calculate next occurrence date
          occurrenceDate = calculateNextDate(
            startDate,
            Recurring_Freq,
            ++count,
          );
        }
      }

      // Scenario 2: Use End_Date to determine how long to keep creating records
      else if (End_Date) {
        const endDate = new Date(End_Date);
        while (occurrenceDate <= endDate) {
          await conn.execute(query, [
            Arrangement_ID || null,
            Staff_ID,
            Request_Status,
            Applied_Datetime,
            occurrenceDate.toISOString().split("T")[0],
            Recurring,
            Recurring_Freq,
            null, // No occurrences count in this case
            End_Date,
            Apply_Reason,
            Update_Reason || null,
            Shift_Type,
          ]);

          // Calculate next occurrence date
          occurrenceDate = calculateNextDate(
            startDate,
            Recurring_Freq,
            ++count,
          );
        }
      }
    }

    // Release connection back to pool
    conn.release();

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
