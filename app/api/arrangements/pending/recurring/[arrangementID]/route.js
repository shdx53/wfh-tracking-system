import connection from "@/app/lib/db";
import { NextResponse } from "next/server";

// Fetching pending recurring arrangements
export async function GET(request, { params }) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Get Arrangement_ID from the params
    const { arrangementID } = params;

    const [data] = await conn.query(
      `
          SELECT Arrangement_ID, Start_Date
          FROM Arrangement
          WHERE Applied_Datetime = (
            SELECT Applied_Datetime 
            FROM Arrangement
            WHERE Arrangement_ID = ?
          )
          AND Staff_ID = (
            SELECT Staff_ID
            FROM Arrangement
            WHERE Arrangement_ID = ?
          )
          AND Request_Status = "pending"
          AND Is_Recurring = 1;
        `,
      [arrangementID, arrangementID],
    );

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
