import connection from "../../../../libs/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests/pending?staffID=Staff_ID

// Fetch all OWN pending requests from the Arrangement table
export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Get Staff_ID input from the request
    const searchParams = request.nextUrl.searchParams;
    const staffID = searchParams.get('staffID');

    // Execute the query
    const [data] = await conn.query("SELECT * FROM Arrangement WHERE Staff_ID = ? AND Request_Status = 'pending'", [staffID]);

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
