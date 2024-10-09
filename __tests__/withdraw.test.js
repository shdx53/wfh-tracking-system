// Endpoint unit test for US 14 http://localhost:3000/api/arrangements/all-personal-arrangement/withdrawn?staffID=150065


//Not all test is passing as have to uncomment the notifications in the route.js first
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
    // Directly use the mockConn declared in beforeEach
    mockConn.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

    const response = await PUT(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      message: "No arrangement found with the given Arrangement_ID.",
    });
  });

  it("should return 200 if update and notification are successful", async () => {
    // Use the same mockConn for setting up the mocks
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
