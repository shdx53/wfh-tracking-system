// US 10 http://localhost:3000/api/arrangements/processed?staffID=151408

import { GET } from "../app/api/arrangements/processed/route.js"; // Adjust path as necessary
import connection from "../app/lib/db"; // Adjust path as necessary
import { NextResponse } from "next/server"; // Import NextResponse for testing

jest.mock("../app/lib/db"); // Mock the database connection

describe("GET /api/arrangements/processed/route.js", () => {
  let request;

  beforeEach(() => {
    // Mock the request object
    request = {
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    };
  });

  it("should return 400 if staffID is not provided", async () => {
    request.nextUrl.searchParams.append("staffID", "");
    
    const mockConn = {
      query: jest.fn()
        .mockResolvedValueOnce([[{ Position: "Employee" }]]), // Mocking position query
      release: jest.fn(),
    };

    connection.mockResolvedValue({
      getConnection: jest.fn().mockResolvedValue(mockConn),
    });
    
    const response = await GET(request);
    
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Staff_ID is required" });
  });

  it("should return 404 if no employee found with the provided Staff_ID", async () => {
    // Set staffID in the query parameters
    request.nextUrl.searchParams.append("staffID", "123");
    
    const mockConn = {
      query: jest.fn().mockResolvedValue([[]]), // Simulating no results
      release: jest.fn(),
    };

    connection.mockResolvedValue({
      getConnection: jest.fn().mockResolvedValue(mockConn),
    });

    const response = await GET(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "No employee found with the provided Staff_ID" });
  });

  it("should return 403 if the user is not a Director or Manager", async () => {
    // Mock the response for the position check
    request.nextUrl.searchParams.append("staffID", "123");
    
    const mockConn = {
      query: jest.fn()
        .mockResolvedValueOnce([[{ Position: "Employee" }]]), // Mocking position query
      release: jest.fn(),
    };

    connection.mockResolvedValue({
      getConnection: jest.fn().mockResolvedValue(mockConn),
    });

    const response = await GET(request);

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ message: "You are not a Director or Manager." });
  });

  it("should return 200 and the data if the user is a Director or Manager", async () => {
    // Mock the request to include staffID
    request.nextUrl.searchParams.append("staffID", "123");
    
    const mockArrangementData = [
      {
        Staff_ID: "456",
        Staff_FName: "John",
        Staff_LName: "Doe",
        Arrangement_ID: "1",
        Request_Status: "pending",
        Start_Date: "2024-10-10 09:00:00",
        Shift_Type: "Full-Time",
        End_Date: "2024-10-10 17:00:00",
        Recurring_Interval: null,
        Apply_Reason: "Personal Reasons",
        Update_Reason: "Changed my mind"
      },
      // Add more mock records as necessary
    ];

    const mockConn = {
      query: jest.fn()
        .mockResolvedValueOnce([[{ Position: "Director" }]]) // Mock position as Director
        .mockResolvedValueOnce([mockArrangementData]) // Mock arrangement data
        .mockResolvedValueOnce([[ /* Mock the arrangement data for recurring if needed */]]), // Mock arrangement data for recurring if needed
      release: jest.fn(),
    };

    connection.mockResolvedValue({
      getConnection: jest.fn().mockResolvedValue(mockConn),
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockArrangementData); // Compare with the mocked arrangement data
  });

  it("should return 500 if an unexpected error occurs", async () => {
    // Mock an error scenario
    request.nextUrl.searchParams.append("staffID", "123");

    connection.mockRejectedValueOnce(new Error("Database error"));

    const response = await GET(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "An unexpected error occurred while processing your request." });
  });
});
