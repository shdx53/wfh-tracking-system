import connection from "@/lib/db";
import { NextResponse } from "next/server";

// Handle POST request to add a work-from-home arrangement
export async function POST(request) {
  try {
    const pool = await connection();
    const conn = await pool.getConnection();

    const { Arrangement_ID, Staff_ID, Request_Status, Applied_Datetime, Start_Date, Recurring, Apply_Reason, Update_Reason, Shift_Type } = await request.json();

    const query = `
      INSERT INTO Arrangement (Arrangement_ID, Staff_ID, Request_Status, Applied_Datetime, Start_Date, Recurring, Apply_Reason, Update_Reason, Shift_Type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await conn.execute(query, [
      Arrangement_ID || null,  // Let the DB auto-increment if null
      Staff_ID,
      Request_Status,
      Applied_Datetime,
      Start_Date,
      Recurring,
      Apply_Reason,
      Update_Reason || null,   // Allow Update_Reason to be null
      Shift_Type,
    ]);

    conn.release();

    return NextResponse.json({ message: "Work-from-home arrangement added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding arrangement:", error);
    return NextResponse.json({ error: "Failed to add arrangement" }, { status: 500 });
  }
}
