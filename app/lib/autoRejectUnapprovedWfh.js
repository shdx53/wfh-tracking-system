// lib/autoRejectUnapprovedWfh.js

// npm run cron:reject-unapproved-wfh
// run the above line in terminal to trigger this script manually

import connection from "./db.js";
import dotenv from "dotenv";
import { sendNotification } from "./notificationService.js";

dotenv.config();

async function rejectUnapprovedWfh() {
  const pool = await connection();
  const conn = await pool.getConnection();

  try {
    /* console.log("----[CRON JOB] Connected to database successfully----"); */

    const now = new Date();
    const query = `
    SELECT Arrangement.Arrangement_ID AS id,
           Arrangement.Staff_ID AS staffId,
           Arrangement.Start_Date AS startDate,
           Employee.Email AS email
    FROM Arrangement
    JOIN Employee ON Arrangement.Staff_ID = Employee.Staff_ID
    WHERE Arrangement.Request_Status = 'pending'
    AND DATE(Arrangement.Start_Date) >= DATE(NOW())
    AND TIMESTAMPDIFF(HOUR, NOW(), Arrangement.Start_Date) <= 24
    ORDER BY Arrangement.Start_Date ASC
    `;

    /* console.log("[CRON JOB] SQL query:", query); */

    const [rows] = await conn.query(query);
    /* console.log("[CRON JOB] Number of rows fetched:", rows.length); */

    for (const row of rows) {
      const arrangement = {
        id: row.id,
        staffId: row.staffId,
        startDate: row.startDate,
        email: row.email,
      };

      const timeDiffHours = Math.floor(
        (arrangement.startDate.getTime() - now.getTime()) / 3600000,
      );

      console.log(
        `[CRON JOB] Checking WFH arrangement ${arrangement.id} for ${arrangement.staffId}`,
      );

      if (timeDiffHours <= 24) {
        try {
          await conn.query(
            "UPDATE Arrangement SET Request_Status = ? WHERE Arrangement_ID = ?",
            ["rejected", arrangement.id],
          );
          console.log(
            `[CRON JOB] Successfully rejected WFH arrangement for ${arrangement.staffId}`,
          );

          // Send notification to employee
          const subject = "WFH Request Automatically Rejected";
          const body = `Dear Employee ${arrangement.staffId} (${arrangement.email}),\n
          Your WFH request for ${arrangement.startDate.toDateString()} has been automatically rejected due to an absence of approval within 24 hours of the scheduled start date.\n
          Please resubmit your request if needed.\n
          Best regards,
          WFH Tracking System`;

          // Send notification using Mailtrap
          console.log(`Email for WFH request sent successfully to ${arrangement.email}.`)
          await sendNotification(subject, body);
        } catch (err) {
          console.error(
            `[CRON JOB] Error rejecting WFH arrangement ${arrangement.id}:`,
            err,
          );
        }
      } else {
        console.log(
          `[CRON JOB] WFH arrangement ${arrangement.id} for ${arrangement.staffId} not rejected (outside 24-hour window)`,
        );
      }
    }

    /* console.log("[CRON JOB] Finished processing unapproved WFH arrangements"); */
    
  } catch (err) {
    console.error(
      "[CRON JOB] Error rejecting unapproved WFH arrangements:",
      err,
    );
  } finally {
    conn.release();
    /* console.log("[CRON JOB] Database connection closed"); */
  }
}

export default rejectUnapprovedWfh; // Exporting the function
