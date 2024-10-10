import { NextResponse } from "next/server";
import connection from "../app/lib/db";
import { POST } from "../app/api/arrangement/route.js";

// Mock the database connection
jest.mock("../app/lib/db", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the sendNotification function
jest.mock("../app/lib/notificationService.js", () => ({
  sendNotification: jest.fn(),
}));

// Mock NextResponse.json
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/arrangement/route.js", () => {
    let mockConnection;
  
    beforeEach(() => {
      // Mock database connection and its methods
      mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          execute: jest.fn().mockResolvedValue([/* mock result if needed */]), // Mock the resolved value
          release: jest.fn(),
        }),
      };
      
      // Mock the connection pool to return the mockConnection
      connection.mockResolvedValue(mockConnection);
      
      // Optionally clear all mocks to avoid state leakage between tests
      jest.clearAllMocks();
    });
  

it("should successfully add a non-recurring arrangement", async () => {
    const mockRequest = {
        json: jest.fn().mockResolvedValue({
        Arrangement_ID: null,
        Staff_ID: 150085,
        Request_Status: "pending",
        Applied_Datetime: "2024-03-15 10:00:00",
        Start_Date: "2024-09-25",
        Recurring: false,
        Recurring_Interval: null,
        End_Date: null,
        Apply_Reason: "TESTING New Code",
        Update_Reason: null,
        Shift_Type: "AM",
        }),
    };

    const response = await POST(mockRequest);

    // Assertions
    expect(connection).toHaveBeenCalled(); // Ensure the connection pool is called
    expect(mockConnection.getConnection).toHaveBeenCalled(); // Ensure getConnection is called
    expect(mockConnection.getConnection().execute).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO Arrangement"),
        expect.arrayContaining([
        null,
        150085,
        "pending",
        "2024-03-15 10:00:00",
        "2024-09-25",
        false,
        null,
        null,
        "TESTING New Code",
        null,
        "AM",
        ])
    );

    // Verifying the correct response
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ error: "Work-from-home arrangement(s) added successfully" });
    });

  it("should successfully add a recurring arrangement", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        Arrangement_ID: null,
        Staff_ID: 150085,
        Request_Status: "pending",
        Applied_Datetime: "2024-03-15 10:00:00",
        Start_Date: "2024-09-25",
        Recurring: true,
        Recurring_Interval: "weekly",
        End_Date: "2024-10-25",
        Apply_Reason: "TESTING New Code",
        Update_Reason: null,
        Shift_Type: "AM",
      }),
    };

    const response = await POST(mockRequest);

    expect(connection).toHaveBeenCalled(); // Ensure the connection pool is called
    expect(mockConnection.getConnection).toHaveBeenCalled(); // Ensure getConnection is called
    expect(mockConnection.getConnection().execute).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO Arrangement"),
        expect.arrayContaining([
          null,
          150085,
          "pending",
          "2024-03-15 10:00:00",
          "2024-09-25",
          true,
          "weekly",
          "2024-10-25",
          "TESTING New Code",
          null,
          "AM",
    
        ])
      );
    // Verifying the correct response
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ error: "Work-from-home arrangement(s) added successfully" });
  });

  it("should return error if WFH request is less than 24 hours in advance", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        Arrangement_ID: null,
        Staff_ID: 150085,
        Request_Status: "pending",
        Applied_Datetime: "2024-03-15 10:00:00",
        Start_Date: new Date(new Date().getTime() + 1000 * 60 * 60 * 23), // Less than 24 hours from now
        Recurring: false,
        Apply_Reason: "Urgent",
        Shift_Type: "AM",
      }),
    };

    const response = await POST(mockRequest);

    // Ensure the correct error message is returned
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "WFH requests must be submitted at least 24 hours in advance." },
      { status: 400 }
    );
  });

  it("should handle errors gracefully", async () => {
    mockConnection.getConnection.mockRejectedValue(new Error("Connection error"));

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        Arrangement_ID: null,
        Staff_ID: 150085,
        Request_Status: "pending",
        Applied_Datetime: "2024-03-15 10:00:00",
        Start_Date: "2024-09-25",
        Recurring: false,
        Apply_Reason: "TESTING New Code",
        Shift_Type: "AM",
      }),
    };

    const response = await POST(mockRequest);

    // Ensure error response is returned
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Failed to add arrangement" },
      { status: 500 }
    );
  });
});
