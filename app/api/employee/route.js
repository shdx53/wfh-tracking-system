import connection from "@/libs/db";

export async function GET(req) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Execute the query to fetch all records from the employee table
    const [rows] = await conn.query("SELECT * FROM employee");

    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return new Response(
      JSON.stringify({ message: "Error connecting to database", error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
