// Endpoints covered: /arrangements/team (US 2 and 3)

import { GET } from "../app/api/arrangements/teams/route.js"; // Adjust path as necessary
import connection from "../app/lib/db"; // Adjust path as necessary
import { NextResponse } from "next/server"; // Import NextResponse for testing

jest.mock("../app/lib/db"); // Mock the database connection

describe("GET /api/arrangements/teams", () => {
    let request;

    beforeEach(() => {
        request = {
            nextUrl: {
                searchParams: new URLSearchParams({
                    staffID: "12345", // Example Staff ID
                    startDate: "2024-10-01", // Example start date
                }),
            },
        };
    });

    it("should return 200 and fetched data if the query is successful", async () => {
        const mockData = [
            {
                Staff_ID: "1",
                Staff_FName: "John",
                Staff_LName: "Doe",
                Start_Date: "2024-10-01",
                Shift_Type: "Morning",
                Position: "Employee",
            },
            {
                Staff_ID: "2",
                Staff_FName: "Jane",
                Staff_LName: "Smith",
                Start_Date: "2024-10-01",
                Shift_Type: "Afternoon",
                Position: "Employee",
            },
        ];

        const mockConn = {
            query: jest.fn().mockResolvedValue([mockData]), // Mock successful query response
            release: jest.fn(), // Mock connection release function
        };

        const mockPool = {
            getConnection: jest.fn().mockResolvedValue(mockConn), // Mock getting connection from pool
        };

        connection.mockResolvedValue(mockPool); // Mock the connection pool

        const response = await GET(request); // Call the GET function

        expect(response.status).toBe(200); // Check if the status is 200
        expect(await response.json()).toEqual(mockData); // Check if the response data matches mock data
        expect(mockConn.query).toHaveBeenCalledTimes(1); // Ensure the query was called
        expect(mockConn.query).toHaveBeenCalledWith(expect.any(String), ["2024-10-01", "12345", "2024-10-01", "12345"]); // Check if the right parameters were passed
        expect(mockConn.release).toHaveBeenCalled(); // Ensure connection is released
    });

    it("should return 500 if there is an error", async () => {
        const errorMessage = "DB connection failed"; // Simulated error message
        connection.mockRejectedValueOnce(new Error(errorMessage)); // Simulate DB connection error

        const response = await GET(request); // Call the GET function

        expect(response.status).toBe(500); // Check if the status is 500
        expect(await response.json()).toEqual({
            message: "Internal server error", // Adjust to match your error response structure
            details: errorMessage, // Include the error message
        });
    });
});
