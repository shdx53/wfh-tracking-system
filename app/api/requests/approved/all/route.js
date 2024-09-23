import connection from "../../../../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests/approved/all

// Fetch ALL approved requests from the Arrangement table
export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Execute the query
    const [data] = await conn.query(
      "SELECT Staff_ID, Start_Date, Shift_Type FROM Arrangement WHERE Request_Status = 'approved'"
    );

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}