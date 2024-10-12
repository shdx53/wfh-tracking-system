// Endpoint unit test for US 14 http://localhost:3000/api/arrangements/all-personal-arrangement/withdrawn?staffID=150065

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

  // Test for missing required parameters
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

  // Test for no arrangement found
  it("should return 404 if no arrangement is found", async () => {
    mockConn.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

    const response = await PUT(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      message: "No arrangement found with the given Arrangement_ID.",
    });
  });

  // Test for successful update and notification
  it("should return 200 if update and notification are successful", async () => {
    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Update successful
      .mockResolvedValueOnce([[{ Reporting_Manager: "456" }]]) // Manager ID found
      .mockResolvedValueOnce([[{ Email: "manager@example.com" }]]); // Manager Email found

    sendNotification.mockResolvedValue(true);

    const response = await PUT(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: "Arrangement is successfully withdrawn, and notification sent.",
    });

    expect(sendNotification).toHaveBeenCalledWith(
      "manager@example.com",
      "WFH Request Withdrawn",
      expect.stringContaining("Staff ID: 150065")
    );
  });

  // Test for DB query failure
  it("should return 500 if an error occurs", async () => {
    mockConn.query.mockRejectedValueOnce(new Error("DB query failed"));

    const response = await PUT(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Internal server error",
      details: "DB query failed",
    });
  });

  // New Test: Manager ID not found
  it("should return 404 if reporting manager is not found", async () => {
    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Arrangement update successful
      .mockResolvedValueOnce([]); // No manager found

    const response = await PUT(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      message: `No reporting manager found for staff ID 150065`,
    });
  });

  // New Test: Manager email not found
  it("should return 404 if manager email is not found", async () => {
    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Arrangement update successful
      .mockResolvedValueOnce([[{ Reporting_Manager: "456" }]]) // Manager ID found
      .mockResolvedValueOnce([]); // No email found

    const response = await PUT(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      message: `No email found for reporting manager ID 456`,
    });
  });

  // New Test: Notification service failure
  it("should return 500 if notification service fails", async () => {
    mockConn.query
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // Arrangement update successful
      .mockResolvedValueOnce([[{ Reporting_Manager: "456" }]]) // Manager ID found
      .mockResolvedValueOnce([[{ Email: "manager@example.com" }]]); // Manager Email found

    sendNotification.mockRejectedValueOnce(new Error("Notification failed"));

    const response = await PUT(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Failed to send notification email.",
      details: "Notification failed",
    });
  });

  // New Test: Database connection failure
  it("should return 500 if the database connection fails", async () => {
    const mockPool = {
      getConnection: jest.fn().mockRejectedValue(new Error("Connection failed")),
    };

    connection.mockResolvedValue(mockPool);

    const response = await PUT(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Internal server error",
      details: "Connection failed",
    });
  });
});

