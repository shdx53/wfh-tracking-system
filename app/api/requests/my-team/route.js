import connection from "../../../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests/my-team?staffID=Staff_ID

// Fetch all TEAMs approved arrangements - Manager, Director to get schedule of teams under them, Staff to get own team schedule (Manager will get both team under them and own schedule)
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
    const [data] = await conn.query(
    `SELECT e.Staff_ID, Start_Date, Shift_Type, e.Position
    FROM Employee e INNER JOIN Arrangement a
    WHERE Reporting_Manager = ? AND e.Staff_ID = a.Staff_ID AND Request_Status = 'approved'
    
    UNION
    
    SELECT a.Staff_ID, Start_Date, Shift_Type, Position
    FROM Arrangement a INNER JOIN Employee e
    WHERE a.Staff_ID = e.Staff_ID AND Request_Status = 'approved' AND a.Staff_ID IN 
    (SELECT e2.Staff_ID
    FROM Employee e1
    INNER JOIN Employee e2
    ON e1.Position = e2.Position AND e1.Reporting_Manager = e2.Reporting_Manager AND e1.Staff_ID = ?);`, [staffID, staffID]);
 
    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
