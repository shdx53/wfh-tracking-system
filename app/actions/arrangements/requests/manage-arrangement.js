"use server";

// Library
import connection from "@/app/lib/db";
import { sendNotification } from "@/app/lib/notificationService.js";

const requestStatus = {
  Approve: "approved",
  Reject: "rejected",
  "Withdraw this specific arrangement only": "withdrawn",
  "Withdraw entire arrangement": "withdrawn",
  Cancel: "cancelled"
};


export async function manageArrangement(formData) {

  // Store the outcomes of each arrangement (recurring & ad-hoc)
  var outcome = {};

  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Loop through the form data (approve/reject/withdraw entire/withdraw all)
    // if adhoc, formData contains only 1 arrgmtID, if recurring, multiple arrgmtIDs
    /* e.g. {
              '144Action': 'Approve',
              '145Action': 'Reject',
              '145Reason': 'Shortage of manpower'
            } */
    for (const key in formData) {
      if (key.includes("Action")) {
        // Break down data into arrangementID, action, and reason
        var actionKey = key;
        var action = formData[actionKey];
        var arrangementID = key.match(/\d+/)[0];

        const reasonKey = `${arrangementID}Reason`;
        let reason;
        if (reasonKey in formData) {
          reason = formData[reasonKey];
        }

        // Update arrangement
        // try {
          if (reason) {
            /* If a reason is provided (for rejection or withdrawawl) */
            if (action === "Withdraw entire arrangement") {

              /* Withdraw entire arrangement */
              // Fetch Applied_Datetime
              const [rows] = await conn.query(
                `SELECT Applied_Datetime FROM Arrangement WHERE Arrangement_ID = ? LIMIT 1`,
                [arrangementID],
              );
              const appliedDatetime = rows[0].Applied_Datetime;

              // Update all arrangements with the same Applied_Datetime
              await conn.query(
                `
                  UPDATE Arrangement 
                  SET Request_Status = "withdrawn", Update_Reason = ? 
                  WHERE Applied_Datetime = ?
                `,
                [reason, appliedDatetime],
              );

              // Notification to staff (only for withdrawal of entire arrangement)

              // Get staffID, start date
              const [staffID_query] = await conn.query("SELECT Staff_ID FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
              const staffID = staffID_query[0]['Staff_ID'];

              // Get all start dates from the recurring arrangement using applied_datetime
              const [startDate_query] = await conn.query("SELECT Start_Date FROM Arrangement WHERE Applied_Datetime = ?", [appliedDatetime]);
              const startDates_ = startDate_query.map((rec) => rec.Start_Date);
              const startDates = startDates_.join(', ');

              // Prepare email content 
              // for withdrawal of entire arrangement
              if (action === "Withdraw entire arrangement") {
                // Prepare email content - reason is not optional
                var subject = "WFH Request " + requestStatus[action];
                var body = `Dear Staff,\n\n
                An entire recurring work-from-home arrangement was ${requestStatus[action]}:\n\n
                Staff ID: ${staffID}\n
                Start Dates: ${startDates}\n
                Reason: ${reason}\n\n
                Thank you. \n\n`;
              }
              
              // (for Reporting Manager email) Notification to staff's reporting manager (only for withdrawal of entire arrangement)

              // Get staff's reporting manager ID
              const [reportingManagerID_query] = await conn.query("SELECT Reporting_Manager FROM Employee WHERE Staff_ID = ?", [staffID]);
              const reportingManagerID = reportingManagerID_query[0]['Reporting_Manager'];

              // Get staff's reporting manager email
              const [reportingManagerEmail_query] = await conn.query("SELECT Email FROM Employee WHERE Staff_ID = ?", [reportingManagerID]);
              var reportingManagerEmail = reportingManagerEmail_query[0]['Email'];

              // Prepare email content for Reporting Manager
              // for withdrawal of entire arrangement
              if (action === "Withdraw entire arrangement") {
                // Prepare email content - reason is not optional
                var subject1 = "WFH Request " + requestStatus[action];
                var body1 = `Dear Reporting Manager (${reportingManagerEmail}),\n\n
                An entire recurring work-from-home arrangement was ${requestStatus[action]}:\n\n
                Staff ID: ${staffID}\n
                Start Dates: ${startDates}\n
                Reason: ${reason}\n\n
                Thank you. \n\n`;
              } 
            } 
            
            else {
              /* Reject or withdraw a single arrangement */
              await conn.query(
                "UPDATE Arrangement SET Request_Status = ?, Update_Reason = ? WHERE Arrangement_ID = ?",
                [requestStatus[action], reason, arrangementID],
              );

              // (for email) Get outcome details of the single arrangement
              const [startDate_query] = await conn.query("SELECT Start_Date FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
              const startDate = startDate_query[0]['Start_Date'];
              outcome[startDate] = { "action": requestStatus[action],
                                      "reason": reason };
              
              // (for Reporting Manager email) Get reporting manager ID if withdraw single arrangement
              if (action === "Withdraw this specific arrangement only") {
                // Get staff ID
                const [staffID_query] = await conn.query("SELECT Staff_ID FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
                const staffID = staffID_query[0]['Staff_ID'];

                // Get staff's reporting manager ID
                const [reportingManagerID_query] = await conn.query("SELECT Reporting_Manager FROM Employee WHERE Staff_ID = ?", [staffID]);
                const reportingManagerID = reportingManagerID_query[0]['Reporting_Manager'];

                // Get staff's reporting manager email
                const [reportingManagerEmail_query] = await conn.query("SELECT Email FROM Employee WHERE Staff_ID = ?", [reportingManagerID]);
                var reportingManagerEmail = reportingManagerEmail_query[0]['Email'];
              }                          
            }
          } 

          else if (action === "Approve") {
            /* Approve arrangement */
            /* *Override Update_Reason to NULL */
            await conn.query(
              "UPDATE Arrangement SET Request_Status = ?, Update_Reason = NULL WHERE Arrangement_ID = ?",
              [requestStatus[action], arrangementID],
            );

            // (for email) Get outcome details of the single arrangement
            const [startDate_query] = await conn.query("SELECT Start_Date FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
            const startDate = startDate_query[0]['Start_Date'];
            outcome[startDate] = { "action": requestStatus[action],
                                      "reason": reason };
          }
          
          else {
            /* Cancel arrangement */
            /* Entire arrangement is deleted */

            // // (for email) Get startDate before arrangement is deleted
            // const [startDate_query] = await conn.query("SELECT Start_Date FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
            // const startDate = startDate_query[0]['Start_Date'];

            // Delete the arrangement
            await conn.query(
              "DELETE FROM Arrangement WHERE Arrangement_ID = ?",
              [arrangementID],
            );

            // // (for email) Get outcome details of the single arrangement
            // outcome[startDate] = { "action": requestStatus[action],
            //                           "reason": reason };

            // Cancelling requests stops here, does not send any email
            console.log('Arrangement ID:', arrangementID, 'Cancel success')

          }
        // } 
        // catch (error) {
        //   return {
        //     message: "Failed to update arrangement(s)",
        //   };
        // }
      }
    }

    // Send email for arrangements that are non-cancel
    if (action !== "Cancel") {
      // Notification to staff (for other types of arrangements)
      // Get staff email, start date
      const [staffID_query] = await conn.query("SELECT Staff_ID FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
      const staffID = staffID_query[0]['Staff_ID'];

      const [staffEmail_query] = await conn.query("SELECT Email FROM Employee WHERE Staff_ID = ?", [staffID]);
      var staffEmail = staffEmail_query[0]['Email'];

      // Email content for recurring arrangements
      if (Object.keys(outcome).length > 1) { // there will be MORE THAN 1 start date in 'outcome'
        var details = ``;
        for (const key in outcome) {
          const date = key; // The date string as the key
          const { action, reason } = outcome[key]; // Destructure to get action and reason
          details += 
        `\nStart Date: ${date}\n
        Outcome: ${action}\n
        Reason: ${reason || "N/A"}\n\n`;
        } 
        // Prepare email content
        var subject = "WFH Request outcome";
        var body = `Dear Staff,\n\n
        Please see the outcomes of your recurring work-from-home arrangement dates:\n\n
        Staff ID: ${staffID}\n
        ${details}\n
        Thank you. \n\n`;
      }

      // Email content for ad-hoc arrangements
      else if (Object.keys(outcome).length === 1) { // there will be ONLY 1 start date in 'outcome'
        for (const key in outcome) {
          var date = key; // The date string as the key
          var { action, reason } = outcome[key]; // Destructure to get action and reason
        }
        // Prepare email content
        var subject = "WFH Request " + action;
        var body = `Dear Staff,\n\n
        A work-from-home arrangement was ${action}:\n\n
        Staff ID: ${staffID}\n
        Start Date: ${date}\n
        Reason: ${reason || "N/A"}\n\n
        Thank you. \n\n`;

        // (for Reporting Manager Email) Prepare email content for Withdraw single arrangement
        if (action === "withdrawn") {
          // Prepare email content
          var subject1 = "WFH Request " + action;
          var body1 = `Dear Reporting Manager (${reportingManagerEmail}),\n\n
          A work-from-home arrangement was ${action}:\n\n
          Staff ID: ${staffID}\n
          Start Date: ${date}\n
          Reason: ${reason}\n\n
          Thank you. \n\n`;
        }
      }


      // Send out the email
      console.log('Subject:', subject);
      console.log(body);
      // Send notification using Mailtrap
      console.log(`Email for WFH request sent successfully to ${staffEmail}.`);
      await sendNotification(subject, body);
      

      // (for Reporting Manager Email) Send out the email to Reporting Manager for all withdrawn requests
      if (reportingManagerEmail) {
        console.log('Subject:', subject1);
        console.log(body1);
        // Send notification using Mailtrap
        console.log(`Email for WFH request sent successfully to Reporting Manager ${reportingManagerEmail}.`);
        await sendNotification(subject1, body1);
      }
    }


    // Release the connection back to the pool
    conn.release();

    return {
      message: "Arrangement(s) updated successfully",
    };
  } catch (error) {
    return {
      message: "Failed to update arrangement(s)",
    };
  }
}
