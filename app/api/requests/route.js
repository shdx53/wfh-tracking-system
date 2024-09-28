import connection from "../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests

// Fetch ALL approved requests from the Arrangement table - and also who is in office
export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Get search params from the request
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const team = searchParams.get("team");

    let data;

    // Execute the query
    if (startDate) {
      const [rows] = await conn.query(
        `
          SELECT e.Staff_ID, e.Staff_FName, e.Staff_LName, e.Dept, a.Start_Date, a.Shift_Type, a.Request_Status
          FROM Employee e
          LEFT JOIN Arrangement a
          ON e.Staff_ID = a.Staff_ID and a.Request_Status = "approved" AND a.Start_Date = "${startDate}";
        `,
      );
      data = rows;
    }

    if (team) {
      const [rows] = await conn.query(
        `
          SELECT Employee.Staff_ID, Employee.Staff_FName, Employee.Staff_LName, Employee.Dept, 
          GROUP_CONCAT(Arrangement.Start_Date) AS Start_Date,
          GROUP_CONCAT(Arrangement.Shift_Type) AS Shift_Type
          FROM Arrangement
          RIGHT JOIN Employee ON Employee.Staff_ID = Arrangement.Staff_ID AND Arrangement.Request_Status = "Approved"
          WHERE Employee.Position = ?
          GROUP BY Employee.Staff_ID;
        `,
        [team],
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
