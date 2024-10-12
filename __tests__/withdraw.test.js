import { PUT } from "../app/api/arrangements/all-personal-arrangement/withdrawn/route"; // Adjust the path as necessary
import connection from "../app/lib/db"; // Adjust the path as necessary
import { sendNotification } from "../app/lib/notificationService"; // Adjust the path as necessary
import { NextResponse } from "next/server";

// Mock the necessary modules
jest.mock("../app/lib/db");
jest.mock("../app/lib/notificationService");

describe("PUT /api/arrangements/all-personal-arrangement/withdrawn", () => {
  let request;
  let mockConn;

  beforeEach(() => {
    request = {
      nextUrl: { searchParams: new URLSearchParams({ staffID: "150065" }) },
      json: jest.fn().mockResolvedValue({
        Arrangement_ID: 1,
        Request_Status: "Withdrawn",
        Update_Reason: "Changed my mind",
      }),
    };

    mockConn = {
      query: jest.fn(),
      release: jest.fn(),
    };

    const mockPool = {
      getConnection: jest.fn().mockResolvedValue(mockConn),
    };

    connection.mockResolvedValue(mockPool);
  });

  it("should return 400 if required parameters are missing", async () => {
    request.json = jest.fn().mockResolvedValue({
      Arrangement_ID: null,
      Request_Status: null,
      Update_Reason: null,
    });

    const response = await PUT(request);
    
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      message: "Arrangement_ID, Request_Status, and Update_Reason are required.",
    });
  });

  it("should return 404 if no arrangement is found", async () => {
    mockConn.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

    const response = await PUT(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      message: "No arrangement found with the given Arrangement_ID.",
    });
  });

  it("should return 404 if no reporting manager is found", async () => {
    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Mock successful update
      .mockResolvedValueOnce(null); // Simulating no manager result

    const response = await PUT(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
        message: `No reporting manager found for staff ID ${request.nextUrl.searchParams.get("staffID")}`,
    });

    expect(mockConn.release).toHaveBeenCalled(); 
  });

  it("should return 404 if no email is found for the reporting manager ID", async () => {
    const managerID = "456"; // Example manager ID

    // Mock the successful update and manager result
    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Mock successful update
      .mockResolvedValueOnce([[{ Reporting_Manager: managerID }]]) // Mock manager ID found
      .mockResolvedValueOnce([]); // Mock email result as empty (no email found)

    const response = await PUT(request); // Call the PUT function with the request object

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
        message: `No email found for reporting manager ID ${managerID}`,
    });

    expect(mockConn.release).toHaveBeenCalled(); 
  });

  it("should return 500 if sending notification fails", async () => {
    const managerID = "456"; // Example manager ID
    const managerEmail = "manager@example.com"; // Mock email
    const subject = "WFH Request Withdrawn"; // Mock subject
    const body = "Your WFH request has been withdrawn."; // Mock body

    // Mock the successful update and manager result
    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Mock successful update
      .mockResolvedValueOnce([[{ Reporting_Manager: managerID }]]) // Mock manager ID found
      .mockResolvedValueOnce([[{ Email: managerEmail }]]); // Mock manager email found

    // Mock sendNotification to throw an error
    sendNotification.mockRejectedValue(new Error("Notification service error"));

    const response = await PUT(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Failed to send notification email.",
    });

    expect(mockConn.release).toHaveBeenCalled(); 
  });

  it("should return 200 if update and notification are successful", async () => {
    const managerID = "456"; // Example manager ID
    const managerEmail = "manager@example.com"; // Mock email
    const subject = "WFH Request Withdrawn"; // Mock subject
    const body = "Your WFH request has been withdrawn."; // Mock body

    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Mock update successful
      .mockResolvedValueOnce([[{ Reporting_Manager: managerID }]]) // Mock manager ID found
      .mockResolvedValueOnce([[{ Email: managerEmail }]]); // Mock manager email found

    // Mock the sendNotification function to resolve successfully
    sendNotification.mockResolvedValue(true);

    const response = await PUT(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
        message: "Arrangement is successfully withdrawn, and notification sent.",
    });

    expect(sendNotification).toHaveBeenCalledWith(
        managerEmail,
        subject,
        expect.stringContaining("Staff ID: 150065") // Ensure correct staffID
    );
  });

  it("should return 500 if an error occurs", async () => {
    mockConn.query.mockRejectedValueOnce(new Error("DB query failed"));

    const response = await PUT(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Internal server error",
      details: "DB query failed",
    });
  });
});
