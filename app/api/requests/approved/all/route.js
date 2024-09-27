import connection from "../../../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests/approved/all

// Fetch ALL approved requests from the Arrangement table - and also who is in office
export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Execute the query
    const [data] = await conn.query(
      `SELECT e.Staff_ID, COALESCE(a.Start_Date, NULL) AS Start_Date, COALESCE(a.Shift_Type, NULL) AS Shift_Type, Request_Status
      FROM Arrangement a
      RIGHT JOIN Employee e
      ON Request_Status = 'approved' AND a.Staff_ID = e.Staff_ID;`,
    );

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
