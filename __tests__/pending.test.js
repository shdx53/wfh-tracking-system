// US 10 http://localhost:3000/api/arrangements/pending?staffID=151408

import { GET } from "../app/api/arrangements/teams/route.js"; // Adjust path as necessary
import connection from "../app/lib/db"; // Adjust path as necessary
import { NextResponse } from "next/server"; // Import NextResponse for testing

jest.mock("../app/lib/db"); // Mock the database connection

describe("GET /api/your-endpoint", () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({
          staffID: "150085", // Sample staff ID for testing
        }),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when the employee is found", () => {
    it("should return 200 and the arrangement data for a Director", async () => {
      const mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          query: jest.fn()
            .mockResolvedValueOnce([{ Position: "Director" }]) // Employee position
            .mockResolvedValueOnce([[ // Arrangement data
              { Staff_ID: "150085", Staff_FName: "John", Staff_LName: "Doe", Arrangement_ID: 1, Request_Status: "pending" }
            ]]),
          release: jest.fn(),
        }),
      };

      connection.mockResolvedValue(mockConnection);

      const response = await GET(mockRequest);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual([[ // Expected response data
        { Staff_ID: "150085", Staff_FName: "John", Staff_LName: "Doe", Arrangement_ID: 1, Request_Status: "pending" }
      ]]);
    });
  });

  describe("when no employee is found", () => {
    it("should return 404 with an error message", async () => {
      const mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          query: jest.fn().mockResolvedValueOnce([]), // No employee found
          release: jest.fn(),
        }),
      };

      connection.mockResolvedValue(mockConnection);

      const response = await GET(mockRequest);

      expect(response.status).toBe(404);
      const responseData = await response.json();
      expect(responseData).toEqual({ error: "No employee found with the provided Staff_ID" });
    });
  });

  describe("when the user is not a Director or Manager", () => {
    it("should return 200 with a message", async () => {
      const mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          query: jest.fn().mockResolvedValueOnce([{ Position: "Employee" }]), // Non-manager position
          release: jest.fn(),
        }),
      };

      connection.mockResolvedValue(mockConnection);

      const response = await GET(mockRequest);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({ message: "You are not a Director or Manager." });
    });
  });

  describe("when a database error occurs", () => {
    it("should return 500 with an error message", async () => {
      const mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          query: jest.fn().mockRejectedValue(new Error("Database error")), // Simulating database error
          release: jest.fn(),
        }),
      };

      connection.mockResolvedValue(mockConnection);

      const response = await GET(mockRequest);

      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ message: "Database error" });
    });
  });
});
