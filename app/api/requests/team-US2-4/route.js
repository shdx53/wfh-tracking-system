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
    const staffID = searchParams.get('staffID');
    const team = searchParams.get('team');

    // Query to get Position from the Employee table
    const [positionData] = await conn.query(`
      SELECT Position 
      FROM Employee 
      WHERE Staff_ID = ?
    `, [staffID]);

    // Check if the query returned any results
    if (positionData.length === 0) {
      return NextResponse.json({ error: 'No employee found with the provided Staff_ID' }, { status: 404 });
    }

    // Extract Position from the query result
    const { Position } = positionData[0];

    // Array of valid positions that can view the entire organization
    const HR_Senior_Management = ['MD', 'Director', 'HR Team'];

    // Initialize data variable for query results
    let data;

    // Build dynamic SQL filter based on team input
    let sqlFilter = "";
    const sqlParams = [];

    if (team) {
      sqlFilter += " AND Employee.Position = ? ";
      sqlParams.push(team);
    }

    // Conditional Query based on Position
    if (HR_Senior_Management.includes(Position)) {
      // Query for senior management to view organisation with team filter
      // User Story 4
      // API end point http://localhost:3000/api/requests/team-US2-4?staffID=160008&team=HR%20Team
      if(team){
        [data] = await conn.query(`
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
      }
      else {
        // Query for senior management to view entire organisation without team filter 
        // API end point http://localhost:3000/api/requests/team-US2-4?staffID=160008 
        [data] = await conn.query(`
        SELECT Employee.Staff_ID, Employee.Staff_FName, Employee.Staff_LName, Employee.Dept, Employee.Position, Employee.Email, Employee.Reporting_Manager,
        GROUP_CONCAT(Arrangement.Request_Status) AS Request_Status,
        GROUP_CONCAT(Arrangement.Applied_Datetime) AS Applied_Datetime,
        GROUP_CONCAT(Arrangement.Start_Date) AS Start_Date,
        GROUP_CONCAT(Arrangement.Shift_Type) AS Shift_Type
        FROM Arrangement
        RIGHT JOIN Employee ON Employee.Staff_ID = Arrangement.Staff_ID
        GROUP BY Employee.Staff_ID;
      `,);
      }
    }
    else {
      // Query for non-senior staff, limited to their reporting team
      // User Story 2
      // API end point http://localhost:3000/api/requests/team-US2-4?staffID=150085
      [data] = await conn.query(`
        SELECT Employee.Staff_ID, Employee.Staff_FName, Employee.Staff_LName, Employee.Dept, Employee.Position, Employee.Email, Employee.Reporting_Manager,
        GROUP_CONCAT(Arrangement.Arrangement_ID) AS Arrangement_Ids, 
        GROUP_CONCAT(Arrangement.Request_Status) as Request_Status, 
        GROUP_CONCAT(Arrangement.Applied_Datetime) as Applied_Datetime, 
        GROUP_CONCAT(Arrangement.Start_Date) as Start_Date, 
        GROUP_CONCAT(Arrangement.Shift_Type) as Shift_Type
        FROM Arrangement
        RIGHT JOIN Employee ON Employee.Staff_ID = Arrangement.Staff_ID
        WHERE Employee.Staff_ID IN (
            SELECT Staff_ID 
            FROM Employee 
            WHERE Reporting_Manager = (
                SELECT Reporting_Manager 
                FROM Employee 
                WHERE Staff_ID = ?
            )
        )
        GROUP BY Employee.Staff_ID;
      `, [staffID]);
    }

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}


