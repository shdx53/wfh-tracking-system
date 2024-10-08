import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
import { addWeeks, addMonths, differenceInHours } from "date-fns";
import { sendNotification } from "@/app/lib/notificationService.js";

// Path: /api/arrangement/approve-reject (with JSON body)

// Endpoint to approve or reject PENDING or PREVIOUSLY APPROVED or REJECTED WFH requests
export async function PUT(request) {
    try {
        // Establish the connection using the pool
        const pool = await connection();

        // Get a connection from the pool
        const conn = await pool.getConnection();

        // Get reason from JSON body
        const arrangements = await request.json();

        // Approve/reject each WFH arrangement
        for (let arrangement in arrangements) {
            var arrangementID = parseInt(arrangement);
            var action = arrangements[arrangement]['action'];
            var reason = arrangements[arrangement]['reason'];

            // Check if staff is Jack
            const[staffID_query] = await conn.query("SELECT Staff_ID FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
            var staffID = staffID_query[0]['Staff_ID'];
            if (staffID === 130002) {
                return NextResponse.json(
                    {
                    error: arrangementID + ": Jack Sim does not require approval for his WFH requestts.",
                    },
                    { status: 400 },
                );
            }

            // Check if start date is 24 hours or less
            const currentDateTime = new Date();
            const[requestedWFHDate_query] = await conn.query("SELECT Start_Date FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
            const requestedWFHDate = requestedWFHDate_query[0]['Start_Date'];
            if (differenceInHours(requestedWFHDate, currentDateTime) < 24) {
            // Return error if it's less than 24 hours in the future
                return NextResponse.json(
                    {
                    error: arrangementID + ": Please select an arrangement with a start date that is at least 24 hours from now.",
                    },
                    { status: 400 },
                );
            }

            // Approve/Reject the WFH request
            // Approve the WFH request
            if (action === "Approve") {
                try {
                    await conn.query("UPDATE Arrangement SET Request_Status = 'approved', Update_Reason = ? WHERE Arrangement_ID = ?", [reason, arrangementID]);
                    console.log("Arrangement ID:", arrangementID, action, "Success");
                } 
                catch (error) {
                    return NextResponse.json({ msg: "Failed to update arrangement", data: error}, { status: 500 });
                    console.log("Arrangement ID:", arrangementID, action, "Failure");
                }
            }
            // Reject the WFH request
            else if (action === "Reject") {
                try {
                    await conn.query("UPDATE Arrangement SET Request_Status = 'rejected', Update_Reason = ? WHERE Arrangement_ID = ?", [reason, arrangementID]);
                    console.log("Arrangement ID:", arrangementID, action, "Success");
                } 
                catch (error) {
                    return NextResponse.json({ msg: "Failed to update arrangement", data: error}, { status: 500 });
                    console.log("Arrangement ID:", arrangementID, action, "Failure");
                }
            }

            // Get staff email, start date
            const [staffEmail_query] = await conn.query("SELECT Email FROM Employee WHERE Staff_ID = ?", [staffID]);
            var staffEmail = staffEmail_query[0]['Email'];

            const [startDate_query] = await conn.query("SELECT Start_Date FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
            var startDate = startDate_query[0]['Start_Date'];

            if (action === "Approve") {
                var outcome = "approved";
            }
            else {
                var outcome = "rejected";
            }

            // Prepare email content
            const subject = "WFH Request " + outcome;
            const body = `Dear Staff,\n\n
            A work-from-home arrangement was ${outcome}:\n\n
            Staff ID: ${staffID}\n
            Start Date: ${startDate}\n
            Reason: ${reason || "N/A"}\n\n
            Thank you. \n\n`;

            // Send notification using Mailtrap
            console.log(`Email for WFH request sent successfully to ${staffEmail}.`);
            /* await sendNotification(staffEmail, subject, body); */

        // Release the connection back to the pool
        conn.release();

    }
    // Return the fetched data as a JSON response
    return NextResponse.json({ msg: "Successfully updated all arrangements"}, { status: 200 });
  } 
    catch (error) {
    return NextResponse.json({ msg: "Failed to update arrangements", data: error}, { status: 500 });
  }
}