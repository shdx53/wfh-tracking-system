import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
import { addWeeks, addMonths, differenceInHours } from "date-fns";
import { sendNotification } from "@/app/lib/notificationService.js";

// Path: /api/arrangement/approve-reject?arrangementID=<arrangementID>&action=<approve/reject>

// Endpoint to approve or reject pending or previously approved or rejected WFH requests
export async function PUT(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Get arrangementID, action input from the url params
    const searchParams = request.nextUrl.searchParams;
    const arrangementID = searchParams.get("arrangementID");
    const action = searchParams.get("action");

    // Get arrangement and details
    const [data] = await conn.query("SELECT * FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);
    const Start_Date = data[0]['Start_Date'];
    const Request_Status = data[0]['Request_Status'];
    const Staff_ID = data[0]['Staff_ID'];


    // 1. Check if the WFH request Start_Date is less than 24 hours from the current date, return error if < 24 hours.
    const currentDateTime = new Date();
    const requestedWFHDate = Start_Date;
    console.log(requestedWFHDate, currentDateTime);
    if (differenceInHours(requestedWFHDate, currentDateTime) < 24) {
      // Return error if it's less than 24 hours in the future
      return NextResponse.json(
        {
          error: "Please select an arrangement with a start date that is at least 24 hours from now.",
        },
        { status: 400 },
      );
    }


    // 2. Check if Staff is Jack Sim, who does not require approval
    if (Staff_ID == 130002) {
      return NextResponse.json(
        {
          error: "Jack Sim does not require approval for his WFH requests.",
        },
        { status: 400 },
      );
    }


    // 3. Check if reason was provided. Return error if:
    //      - no reason was provided to reject requests, or
    //      - no reason was provided to reject previously approved requests, or
    //      - no reason was provided to approve previously rejected requests
    const { update_reason } = await request.json(); // Get reason from JSON body
    // Error if no reason was provided for rejecting requests
    if (action == "reject" && (update_reason == null || update_reason == "")) {
      return NextResponse.json(
        {
          error: "Please provide a reason for the rejection.",
        },
        { status: 400 },
      );
    }
    // Error if no reason was provided for approving previously rejected requests
    else if (action == "approve" && Request_Status == "rejected" && (update_reason == null || update_reason == "")) {
      return NextResponse.json(
        {
          error: "Please provide a reason for the approval.",
        },
        { status: 400 },
      );
    }


    // 4. Approve or reject the WFH request
    // Approve a pending request (reason is optional), or Approve a previously rejected request (should provide reason to update previous rejected reason)
    if (action === "approve") {
      await conn.query("UPDATE Arrangement SET Request_Status = 'approved', Update_Reason = ? WHERE Arrangement_ID = ?", [update_reason, arrangementID]);
    } 
    // Reject a pending request, or Reject a previously approved request (need to provide reason for both cases)
    else if (action === "reject") {
      await conn.query("UPDATE Arrangement SET Request_Status = 'rejected', Update_Reason = ? WHERE Arrangement_ID = ?", [update_reason, arrangementID]);
    }


    // 5. Return the updated arrangement details
    const [data_updated] = await conn.query("SELECT * FROM Arrangement WHERE Arrangement_ID = ?", [arrangementID]);


    // 6. Notification to staff
    // if (action === "reject") {
    //   var email_action = "rejected";
    // }
    // else if (action === "approve") {
    //   var email_action = "approved";
    // }
    // const staffEmail = "staff@example.com";
    // const subject = "WFH Request " + email_action;
    // const body = `Dear Staff,\n\n
    // A work-from-home arrangement was ${email_action}:\n\n
    // Staff ID: ${Staff_ID}\n
    // Start Date: ${Start_Date}\n
    // Update Reason: ${update_reason}\n\n
    // `;
    // await sendNotification(staffEmail, subject, body);


    // Release the connection back to the pool
    conn.release();

    // Return the fetched data as a JSON response
    return NextResponse.json({ msg: "Successfully updated arrangement", data: data_updated}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to update arrangement", data: error}, { status: 500 });
  }
}
