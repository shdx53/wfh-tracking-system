import connection from "@/app/lib/db";
import { NextResponse } from "next/server";

// Example Endpoint: http://localhost:3000/api/requests/all-personal-arrangement?staffID=150085
export async function GET(request) {
  let conn; // Declare conn outside of try block for access in finally

  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    conn = await pool.getConnection();

    // Get Staff_ID input from the request
    const searchParams = request.nextUrl.searchParams;
    const staffID = searchParams.get("staffID");

    // Execute query to retrieve all arrangements of one staff
    const [data] = await conn.query(
      `
      SELECT Arrangement_ID, Request_Status,
              Applied_Datetime, Start_Date,
              Recurring_Interval, End_Date,
              Apply_Reason, Update_Reason, Shift_Type
      FROM Arrangement
      WHERE Staff_ID = ?
      AND Arrangement.Is_Recurring = 0
      
      UNION
      
      SELECT
      GROUP_CONCAT(Arrangement.Arrangement_ID) AS Arrangement_ID,
      GROUP_CONCAT(Arrangement.Request_Status) AS Request_Status,
      GROUP_CONCAT(Arrangement.Applied_Datetime) AS Applied_Datetime,
      GROUP_CONCAT(Arrangement.Start_Date) AS Start_Date,  
      GROUP_CONCAT(Arrangement.Recurring_Interval) AS Recurring_Interval,  
      GROUP_CONCAT(Arrangement.End_Date) AS End_Date,
      GROUP_CONCAT(Arrangement.Apply_Reason) AS Apply_Reason,
      GROUP_CONCAT(Arrangement.Update_Reason) AS Update_Reason,
      GROUP_CONCAT(Arrangement.Shift_Type) AS Shift_Type
      FROM Arrangement
      WHERE Staff_ID = ?
      AND Arrangement.Is_Recurring = 1
      AND Arrangement.Request_Status = 'pending'
      GROUP BY Arrangement.Recurring_Interval, Arrangement.End_Date, Arrangement.Shift_Type;`,
      [staffID, staffID],
    );

    // return a response if a staff does not have any arrangements
    if (!data.length) {
      return NextResponse.json(
        { message: "You do not have any past or present application." },
        { status: 200 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Internal server error" }, // Remove details for consistency with tests
      { status: 500 }
    );
  } finally {
    // Release the connection back to the pool if it was established
    if (conn) {
      conn.release();
    }
  }
}
