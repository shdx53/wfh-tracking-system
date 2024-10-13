import connection from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Get Staff_ID from the request
    const searchParams = request.nextUrl.searchParams;
    const staffID = searchParams.get("staffID");

    // Execute the query
    const [data] = await conn.query(`SELECT Position FROM Employee WHERE Staff_ID = ${staffID}`);

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
