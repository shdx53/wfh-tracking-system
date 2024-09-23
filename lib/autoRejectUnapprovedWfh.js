// lib/autoRejectUnapprovedWfh.js

// npm run cron:reject-unapproved-wfh
// run the above line in terminal to trigger this script manually

import connection from "./db.js";
import dotenv from "dotenv";

dotenv.config();

// Console.log statements for testing
/* console.log('Environment variables:');
console.log('DB_IP:', process.env.DB_IP);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('-----') */

let intervalId;

async function rejectUnapprovedWfh() {
  const pool = await connection();
  const conn = await pool.getConnection();

  try {
    console.log("Connected to database successfully");

    const now = new Date();

    const query = `
    SELECT Arrangement_ID, Staff_ID, Start_Date
    FROM Arrangement
    WHERE Request_Status = 'pending'
      AND DATE(Start_Date) >= DATE(NOW())
      AND TIMESTAMPDIFF(HOUR, NOW(), Start_Date) <= 24
    ORDER BY Start_Date ASC
    `;

    console.log("SQL query:", query);

    const [rows] = await conn.query(query);

    console.log("Number of rows fetched:", rows.length);
    for (const row of rows) {
      const arrangement = {
        id: row.Arrangement_ID,
        staffId: row.Staff_ID,
        startDate: row.Start_Date,
      };

      // Calculate the time difference between now and the start date
      const timeDiffHours = Math.floor(
        (arrangement.startDate.getTime() - now.getTime()) / 3600000,
      );

      console.log("-------");
      console.log(
        `Checking WFH arrangement ${arrangement.id} for ${arrangement.staffId}`,
      );
      console.log(`Start date: ${arrangement.startDate}`);
      console.log(`Time remaining until start: ${timeDiffHours} hours`);

      if (timeDiffHours <= 24) {
        try {
          // Reject the WFH arrangement
          await conn.query(
            "UPDATE Arrangement SET Request_Status = ? WHERE Arrangement_ID = ?",
            ["rejected", arrangement.id],
          );

          console.log(
            `Successfully rejected unapproved WFH arrangement for ${arrangement.staffId} starting on ${arrangement.startDate}`,
          );
        } catch (err) {
          console.error(
            `Error rejecting WFH arrangement ${arrangement.id}:`,
            err,
          );
        }
      } else {
        console.log(
          `WFH arrangement ${arrangement.id} for ${arrangement.staffId} not rejected (outside 24-hour window)`,
        );
      }
    }

    console.log("Finished processing unapproved WFH arrangements");
  } catch (err) {
    console.error("Error rejecting unapproved WFH arrangements:", err);
  } finally {
    /* await connection.end(); */
    conn.release();
    console.log("Database connection closed");
  }
}

process.on("SIGINT", () => {
  console.log("\nStopping auto rejection script...");
  clearInterval(intervalId);
  process.exit(0);
});

console.log("Auto rejection script started. Running every minute.");
console.log("Current time:", new Date());

intervalId = setInterval(rejectUnapprovedWfh, 60000); // 60000 milliseconds = 1 minute

console.log("Waiting for the next minute...");
