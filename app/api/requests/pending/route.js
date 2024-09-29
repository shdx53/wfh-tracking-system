import connection from "../../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests/pending?staffID=Staff_ID

// Fetch all OWN pending requests from the Arrangement table
export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    const searchParams = request.nextUrl.searchParams;

    // Get Staff_ID input from the request
    const staffID = searchParams.get("staffID");

    // Get Start_Date input from the request
    const startDate = searchParams.get("startDate");

    let data;

    // Execute the query
    if (staffID && !startDate) {
      const [rows] = await conn.query(
        "SELECT Start_Date, Shift_Type FROM Arrangement WHERE Staff_ID = ? AND Request_Status = 'pending'",
        [staffID],
      );
      data = rows;
    }

    if (staffID && startDate) {
      const [rows] = await conn.query(
        "SELECT Start_Date, Shift_Type FROM Arrangement WHERE Staff_ID = ? AND Start_Date = ? AND Request_Status = 'pending'",
        [staffID, startDate],
      );
      data = rows;
    }

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
