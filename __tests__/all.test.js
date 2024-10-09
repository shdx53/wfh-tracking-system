// Endpoint unit test for US 4 http://localhost:3000/api/request/team-overall

import { GET } from "@/app/api/requests/team-overall/route.js"; // Adjust the import path as necessary
import connection from "../app/lib/db"; // Adjust path as necessary
import { NextResponse } from "next/server"; // Import NextResponse for testing

jest.mock("../app/lib/db"); // Mock the database connection

describe("GET /api/requests/team-overall", () => {
  let request;

  beforeEach(() => {
    request = {
      nextUrl: {
        searchParams: new URLSearchParams({
          staffID: "12345", // Example Staff ID
        }),
      },
    };
  });

  it("should return 200 and data for senior management", async () => {
    const mockPositionData = [{ Position: "MD" }];
    const mockData = [
      {
        Staff_ID: "1",
        Staff_FName: "John",
        Staff_LName: "Doe",
        Dept: "HR",
        Position: "MD",
        Email: "john.doe@example.com",
        Reporting_Manager: "Manager1",
        Request_Status: "Approved",
        Applied_Datetime: "2024-01-01 10:00:00",
        Start_Date: "2024-01-02",
        Shift_Type: "Morning",
      },
    ];

    const mockConn = {
      query: jest.fn()
        .mockResolvedValueOnce([mockPositionData])
        .mockResolvedValueOnce([mockData]),
      release: jest.fn(),
    };

    const mockPool = {
      getConnection: jest.fn().mockResolvedValue(mockConn),
    };

    connection.mockResolvedValue(mockPool);

    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockData);
    expect(mockConn.query).toHaveBeenCalledTimes(2);
    expect(mockConn.release).toHaveBeenCalled(); 
  });

  it("should return 200 and data for non-senior staff", async () => {
    const mockPositionData = [{ Position: "Employee" }];
    const mockData = [
      {
        Staff_ID: "2",
        Staff_FName: "Jane",
        Staff_LName: "Smith",
        Dept: "IT",
        Position: "Employee",
        Email: "jane.smith@example.com",
        Reporting_Manager: "Manager1",
        Arrangement_Ids: "1,2",
        Request_Status: "Pending",
        Applied_Datetime: "2024-01-03 10:00:00",
        Start_Date: "2024-01-04",
        Shift_Type: "Afternoon",
      },
    ];

    const mockConn = {
      query: jest.fn()
        .mockResolvedValueOnce([mockPositionData])
        .mockResolvedValueOnce([mockData]),
      release: jest.fn(),
    };

    const mockPool = {
      getConnection: jest.fn().mockResolvedValue(mockConn),
    };

    connection.mockResolvedValue(mockPool);

    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockData);
    expect(mockConn.query).toHaveBeenCalledTimes(2);
    expect(mockConn.release).toHaveBeenCalled(); 
  });

  it("should return 404 if no employee is found", async () => {
    const mockPositionData = []; // Mock empty position data

    const mockConn = {
      query: jest.fn().mockResolvedValueOnce([mockPositionData]), // No results for position
      release: jest.fn(), // Mock connection release function
    };

    const mockPool = {
      getConnection: jest.fn().mockResolvedValue(mockConn), // Mock getting connection from pool
    };

    connection.mockResolvedValue(mockPool); // Mock the connection pool

    const response = await GET(request); // Call the GET function

    expect(response.status).toBe(404); // Check if the status is 404
    expect(await response.json()).toEqual({ error: "No employee found with the provided Staff_ID" }); // Check error response
    expect(mockConn.release).toHaveBeenCalled(); // Ensure connection is released
  });

  it("should return 500 if there is a database error", async () => {
    const errorMessage = "DB connection failed"; // Simulated error message
    const mockConn = {
      query: jest.fn().mockRejectedValueOnce(new Error(errorMessage)), // Simulate DB query error
      release: jest.fn(), // Mock connection release function
    };

    const mockPool = {
      getConnection: jest.fn().mockResolvedValue(mockConn), // Mock getting connection from pool
    };

    connection.mockResolvedValue(mockPool); // Mock the connection pool

    const response = await GET(request); // Call the GET function

    expect(response.status).toBe(500); // Check if the status is 500
    expect(await response.json()).toEqual({ error: errorMessage }); // Check if the response contains the error message
    expect(mockConn.release).toHaveBeenCalled(); // Ensure connection is released
  });
});
