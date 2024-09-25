import connection from "@/lib/db";
import { NextResponse } from "next/server";

// Example Endpoint: http://localhost:3000/api/requests/all-personal-arrangement?staffID=150085
export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Get Staff_ID input from the request
    const searchParams = request.nextUrl.searchParams;
    const staffID = searchParams.get('staffID');

    // Execute query to retrieve all Arrangement of one staff
    const [data] = await conn.query(
        `SELECT Arrangement_ID, Request_Status, Applied_Datetime, Start_Date, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type
        FROM Arrangement
        WHERE Staff_ID = ?`,
        [staffID],
      );

    // Release the connection back to the pool
    conn.release();


    // return a response if a staff do not have any arrangement 
    if (data.length === 0) {
      return NextResponse.json({ message: "You do not have any past or present application." }, { status: 200 });
    }

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}


