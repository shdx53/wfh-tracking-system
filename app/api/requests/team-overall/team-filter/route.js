import connection from "@/lib/db";
import { NextResponse } from "next/server";

// Example endpoint to fetch all records from the employee table
export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Get Staff_ID and Team input from the request
    const searchParams = request.nextUrl.searchParams;
    const team = searchParams.get('team');
      
    // Execute the query for team filter
    // API end point http://localhost:3000/api/requests/team-overall/team-filter?team=HR%20Team
    const [data] = await conn.query(`
        SELECT Employee.Staff_ID, Employee.Staff_FName, Employee.Staff_LName, Employee.Dept, Employee.Position, Employee.Email, Employee.Reporting_Manager,
        GROUP_CONCAT(Arrangement.Request_Status) AS Request_Status,
        GROUP_CONCAT(Arrangement.Applied_Datetime) AS Applied_Datetime,
        GROUP_CONCAT(Arrangement.Start_Date) AS Start_Date,
        GROUP_CONCAT(Arrangement.Shift_Type) AS Shift_Type
        FROM Arrangement
        RIGHT JOIN Employee ON Employee.Staff_ID = Arrangement.Staff_ID
        WHERE Employee.Position = ?
        GROUP BY Employee.Staff_ID;
    `,[team]);

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}


