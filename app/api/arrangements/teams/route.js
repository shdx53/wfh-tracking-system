import connection from "../../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests/teams?staffID=Staff_ID

// Fetch all TEAMs approved arrangements - Manager, Director to get schedule of teams under them, Staff to get own team schedule (Manager will get both team under them and own schedule) - also gets the staff who are in office
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

    // Execute the query
    const [data] = await conn.query(
      `SELECT e.Staff_ID, e.Staff_FName, e.Staff_LName, COALESCE(a.Start_Date, NULL) AS Start_Date, COALESCE(a.Shift_Type, NULL) AS Shift_Type, e.Position
      FROM Employee e
      LEFT JOIN Arrangement a 
      ON e.Staff_ID = a.Staff_ID 
      AND a.Request_Status = 'approved'
      AND a.Start_Date = ?
      WHERE e.Reporting_Manager = ? 
      AND e.Position != 'MD' 
      AND e.Position != 'Director'
      
      UNION
      
      SELECT e.Staff_ID, e.Staff_FName, e.Staff_LName, COALESCE(a.Start_Date, NULL) AS Start_Date, COALESCE(a.Shift_Type, NULL) AS Shift_Type, e.Position
      FROM Arrangement a 
      RIGHT JOIN Employee e
      ON a.Staff_ID = e.Staff_ID 
      AND a.Request_Status = 'approved' 
      AND a.Start_Date = ?
      WHERE e.Staff_ID IN 
      (SELECT e2.Staff_ID
      FROM Employee e1
      INNER JOIN Employee e2
      ON e1.Position = e2.Position 
      AND e1.Reporting_Manager = e2.Reporting_Manager 
      AND e1.Position != 'Director' 
      AND e1.Position != 'MD' 
      AND e1.Staff_ID = ?);`,
      [startDate, staffID, startDate, staffID],
    );

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error); // Log the error for debugging
    return NextResponse.json(
      {
        message: "Internal server error",
        details: error.message, // Include error message for debugging
      },
      { status: 500 }
    );
  }
}
