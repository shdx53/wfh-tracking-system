// lib/cronJobs.mjs
import cron from "node-cron";
import rejectUnapprovedWfh from "./autoRejectUnapprovedWfh.js"; // Import your main cron task

export function startCronJobs() {
  // Check for Overlapping Executions
  let isRunning = false;

  cron.schedule("* * * * *", () => {
    if (!isRunning) {
      isRunning = true;
      try {
        console.log(
          `[CRON JOB ${Date.now()} in ${process.env.NODE_ENV}] Running WFH auto-reject job every minute...`,
        );
        rejectUnapprovedWfh(); // Call your task function
      } finally {
        isRunning = false;
      }
    }
  });
}
