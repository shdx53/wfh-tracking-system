// Endpoint unit test for US 1 http://localhost:3000/api/arrangements/personal/approved?staffID=150085&startDate=2024-10-01(optional)

import { GET } from "../app/api/arrangements/personal/approved/route"; // Adjust the path as necessary
import connection from "../app/lib/db"; // Adjust the path as necessary
import { NextResponse } from "next/server";

jest.mock("../app/lib/db"); // Mock the database connection

// grouping test cases
describe("GET /api/arrangements/personal/approved", () => {
    let requestWithoutStartDate;
    let requestWithStartDate;

    // request object
    beforeEach(() => {
        requestWithoutStartDate = {
            nextUrl: {
              searchParams: new URLSearchParams({ staffID: "150085" })
            }
        };
        requestWithStartDate = {
            nextUrl: {
              searchParams: new URLSearchParams({ staffID: "150085", startDate: "2024-10-01" })
            }
        };
    });

    // Test Case 1: Successful query of personal approved WFH arrangements without start date as a param
    it("should return 200 and approved requests without start date as param", async () => {
        // Mock data to simulate successful query executions
        const mockData = [
            {
                Start_Date: "2024-10-01",
                Shift_Type: "AM"
            },
            {
                Start_Date: "2024-10-02",
                Shift_Type: "PM"
            },
            {
                Start_Date: "2024-10-03",
                Shift_Type: "Full Day"
            }
        ];

        // Mock the database connection
        const mockConn = {
            query: jest.fn().mockResolvedValue([mockData]), // Mock successful query response - mockResolvedValue tells the mock function what value it should resolve to when called, i.e. mockData
            release: jest.fn(), // Mock connection release function
        };

        const mockPool = {
            getConnection: jest.fn().mockResolvedValue(mockConn), // Mock getting connection from pool
        };

        connection.mockResolvedValue(mockPool); // Mock the connection pool

        const response = await GET(requestWithoutStartDate); // Call the GET function

        expect(response.status).toBe(200); // Check if the status is 200
        expect(await response.json()).toEqual(mockData); // Check if the response data matches mock data
        expect(mockConn.query).toHaveBeenCalledTimes(1); // Ensure the query was called
        expect(mockConn.query).toHaveBeenCalledWith(expect.any(String), ["150085"]); // Check if the right parameters were passed
        expect(mockConn.release).toHaveBeenCalled(); // Ensure connection is released
    });

    // Test Case 2: Successful query of personal approved WFH arrangements with start date as a param
    it("should return 200 and approved requests with start date specified as param", async () => {
        // Mock data to simulate successful query executions
        const mockData = [
            {
                Start_Date: "2024-10-01",
                Shift_Type: "AM"
            },
            {
                Start_Date: "2024-10-02",
                Shift_Type: "PM"
            },
            {
                Start_Date: "2024-10-03",
                Shift_Type: "Full Day"
            }
        ];

        // Mock the database connection
        const mockConn = {
            query: jest.fn().mockResolvedValue([mockData]), // Mock successful query response - mockResolvedValue tells the mock function what value it should resolve to when called, i.e. mockData
            release: jest.fn(), // Mock connection release function
        };

        const mockPool = {
            getConnection: jest.fn().mockResolvedValue(mockConn), // Mock getting connection from pool
        };

        connection.mockResolvedValue(mockPool); // Mock the connection pool

        const response = await GET(requestWithStartDate); // Call the GET function

        expect(response.status).toBe(200); // Check if the status is 200
        expect(await response.json()).toEqual(mockData); // Check if the response data matches mock data
        expect(mockConn.query).toHaveBeenCalledTimes(1); // Ensure the query was called
        expect(mockConn.query).toHaveBeenCalledWith(expect.any(String), ["150085", "2024-10-01"]); // Check if the right parameters were passed
        expect(mockConn.release).toHaveBeenCalled(); // Ensure connection is released
    });

    // Test Case 3: Error returning arrangements without start date as a param
    it("should return 500 - an error returning arrangements without start date as param", async () => {
        const errorMessage = "DB connection failed"; // Simulated error message
        connection.mockRejectedValueOnce(new Error(errorMessage)); // Simulate DB connection error

        const response = await GET(requestWithoutStartDate); // Call the GET function

        expect(response.status).toBe(500); // Check if the status is 500
    });

    // Test Case 4: Error returning arrangements with start date as a param
    it("should return 500 - an error returning arrangements with start date as param", async () => {
        const errorMessage = "DB connection failed"; // Simulated error message
        connection.mockRejectedValueOnce(new Error(errorMessage)); // Simulate DB connection error

        const response = await GET(requestWithStartDate); // Call the GET function

        expect(response.status).toBe(500); // Check if the status is 500
    });
});