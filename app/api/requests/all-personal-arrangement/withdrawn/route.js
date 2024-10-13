import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
import { sendNotification } from "@/app/lib/notificationService.js";

// Example Endpoint: http://localhost:3000/api/requests/update-status
export async function PUT(request) {
  try {
    // Establish the connection using the pool
    const pool = await connection();
    const conn = await pool.getConnection();

    // Get Staff_ID input from the request
    const searchParams = request.nextUrl.searchParams;
    const staffID = searchParams.get("staffID");
    console.log("Staff ID:", staffID);

    // Parse the request body to get Arrangement_ID, Request_Status, and Update_Reason
    const { Arrangement_ID, Request_Status, Update_Reason } = await request.json();

    // Check that all parameters are provided
    if (!Arrangement_ID || !Request_Status || !Update_Reason) {
      return NextResponse.json(
        { message: "Arrangement_ID, Request_Status, and Update_Reason are required." },
        { status: 400 } // Use 400 Bad Request for missing parameters
      );
    }

    // Execute the query to update the Request_Status and Update_Reason
    const [data] = await conn.query(
      `
      UPDATE Arrangement
      SET Request_Status = ?, Update_Reason = ?
      WHERE Arrangement_ID = ?;
      `,
      [Request_Status, Update_Reason, Arrangement_ID]
    );

    // Check if any rows were affected (i.e., whether the update was successful)
    if (data.affectedRows === 0) {
      conn.release();
      return NextResponse.json(
        { message: "No arrangement found with the given Arrangement_ID." },
        { status: 404 } // Not Found status if no matching Arrangement_ID
      );
    }

    // ----Preparation for Notification----
    // Get the reporting manager's ID for the current staff
    const managerResult = await conn.query(
      `
      SELECT Reporting_Manager FROM Employee
      WHERE Staff_ID = ?
      `,
      [staffID]
    );

    if (!managerResult || managerResult.length === 0) {
      console.error(`No reporting manager found for staff ID ${staffID}`);
      conn.release();
      return NextResponse.json(
        { message: `No reporting manager found for staff ID ${staffID}` },
        { status: 404 }
      );
    }

    const managerID = managerResult[0][0].Reporting_Manager;

    // Get the email of the reporting manager
    const getEmailQuery = `
      SELECT Email FROM Employee
      WHERE Staff_ID = ?
    `;
    const emailResult = await conn.query(getEmailQuery, [managerID]);

    if (!emailResult || emailResult.length === 0) {
      console.error(`No email found for reporting manager ID ${managerID}`);
      conn.release();
      return NextResponse.json(
        { message: `No email found for reporting manager ID ${managerID}` },
        { status: 404 }
      );
    }

    const managerEmail = emailResult[0][0].Email;

    // Prepare email content
    const subject = "WFH Request Withdrawn";
    const body = `Dear Manager/Director ${managerID} (${managerEmail}),\n
    A work-from-home arrangement has been withdrawn:\n
    Staff ID: ${staffID}\n
    Withdraw Reason: ${Update_Reason || "N/A"}\n\n
    Please review the request, thank you.\n\n`;

    // Send notification using Mailtrap (or any email service)
    try {
      console.log("Sending email to:", managerEmail);
      await sendNotification(subject, body);
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      conn.release();
      return NextResponse.json(
        { message: "Failed to send notification email.", details: emailError.message },
        { status: 500 }
      );
    }
    // ----End of Notification----

    // Release the connection back to the pool
    conn.release();

    // Return success message if withdrawn was successful
    return NextResponse.json(
      { message: "Arrangement is successfully withdrawn, and notification sent." },
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors and return an error response
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Internal server error", details: error.message }, { status: 500 });
  }
}