import connection from "@/app/lib/db";
import { NextResponse } from "next/server";

// Example endpoint to fetch all records from the employee table
export async function GET(request) {
  let conn; // Declare conn variable to manage connection
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    conn = await pool.getConnection();

    // Get Staff_ID and Team input from the request
    const searchParams = request.nextUrl.searchParams;
    const staffID = searchParams.get("staffID");

    // Check if staffID is provided
    if (!staffID) {
      return NextResponse.json(
        { error: "Staff_ID is required" },
        { status: 400 }
      );
    }

    // Query to get Position from the Employee table
    const [positionData] = await conn.query(
      `
      SELECT Position 
      FROM Employee 
      WHERE Staff_ID = ?
    `,
      [staffID],
    );

    // Check if the query returned any results
    if (positionData.length === 0) {
      return NextResponse.json(
        { error: "No employee found with the provided Staff_ID" },
        { status: 404 }
      );
    }

    // Extract Position from the query result
    const { Position } = positionData[0];

    // Array of Director and Manager positions that can view their own team request
    const Senior_Management_Managers = [
      "MD",
      "Director",
      "Sales Manager",
      "Finance Manager",
    ];

    // Initialize data variable for query results
    let data;

    // Conditional Query based on Position
    if (Senior_Management_Managers.includes(Position)) {
      [data] = await conn.query(
        `
            SELECT Employee.Staff_ID,
                Employee.Staff_FName,
                Employee.Staff_LName,
                Arrangement.Arrangement_ID,
                Arrangement.Request_Status,
                Arrangement.Start_Date,  
                Arrangement.Shift_Type,
                Arrangement.End_Date,
                Arrangement.Recurring_Interval,
                Arrangement.Apply_Reason,
                Arrangement.Update_Reason
            FROM Arrangement
            RIGHT JOIN Employee ON Employee.Staff_ID = Arrangement.Staff_ID
            WHERE Employee.Staff_ID IN (
                SELECT Staff_ID 
                FROM Employee 
                WHERE Reporting_Manager = ?)
            AND Arrangement.Is_Recurring = 0
            AND Arrangement.Start_Date >= DATE_ADD(NOW(), INTERVAL 24 HOUR)
            AND Arrangement.Request_Status = 'pending'
            
            UNION

            SELECT Employee.Staff_ID,
                Employee.Staff_FName,
                Employee.Staff_LName,
                GROUP_CONCAT(Arrangement.Arrangement_ID) as Arrangement_ID,
                GROUP_CONCAT(Arrangement.Request_Status) as Request_Status,
                GROUP_CONCAT(Arrangement.Start_Date) as Start_Date,  
                GROUP_CONCAT(Arrangement.Shift_Type) as Shift_Type,
                GROUP_CONCAT(Arrangement.End_Date) as End_Date,
                GROUP_CONCAT(Arrangement.Recurring_Interval) as Recurring_Interval,
                GROUP_CONCAT(Arrangement.Apply_Reason) as Apply_Reason,
                GROUP_CONCAT(Arrangement.Update_Reason) as Update_Reason
            FROM Arrangement
            RIGHT JOIN Employee ON Employee.Staff_ID = Arrangement.Staff_ID
            WHERE Employee.Staff_ID IN (
                SELECT Staff_ID 
                FROM Employee 
                WHERE Reporting_Manager = ?)
            AND Arrangement.Is_Recurring = 1
            AND Arrangement.Start_Date >= DATE_ADD(NOW(), INTERVAL 24 HOUR)
            AND Arrangement.Request_Status = 'pending'
                        
            GROUP BY Employee.Staff_ID, Arrangement.Recurring_Interval, Arrangement.End_Date, Arrangement.Shift_Type;
          `,
        [staffID, staffID],
      );
    } else {
      return NextResponse.json(
        { message: "You are not a Director or Manager." },
        { status: 403 }, // Updated to return a 403 status
      );
    }

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  } finally {
    // Release the connection back to the pool if it was acquired
    if (conn) {
      conn.release();
    }
  }
}
