// lib/cronJobs.mjs
import cron from 'node-cron';
import rejectUnapprovedWfh from './autoRejectUnapprovedWfh.js';  // Import your main cron task

export function startCronJobs() {
  // Schedule the cron job to run every minute
  cron.schedule('* * * * *', () => {
    console.log("[CRON JOB] Running WFH auto-reject job every minute...");
    rejectUnapprovedWfh();  // Call your task function
  });
}
