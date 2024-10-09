// US 11 http://localhost:3000/api/arrangements/personal?staffID=150085

import { GET } from "../app/api/arrangements/personal/route.js"; // Adjust path as necessary
import connection from "../app/lib/db"; // Adjust path as necessary
import { NextResponse } from "next/server"; // Import NextResponse for testing

jest.mock("../app/lib/db"); // Mock the database connection

describe("GET /api/arrangements/personal", () => {
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

  describe("when arrangements are found", () => {
    it("should return 200 and the arrangement data", async () => {
      const mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          query: jest.fn().mockResolvedValue([[{ Arrangement_ID: 1, Request_Status: 'approved' }]]),
          release: jest.fn(),
        }),
      };

      connection.mockResolvedValue(mockConnection);

      const response = await GET(mockRequest);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual([{ Arrangement_ID: 1, Request_Status: 'approved' }]);
    });
  });

  describe("when no arrangements are found", () => {
    it("should return 200 and a message", async () => {
      const mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          query: jest.fn().mockResolvedValue([[]]),
          release: jest.fn(),
        }),
      };

      connection.mockResolvedValue(mockConnection);

      const response = await GET(mockRequest);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      expect(responseData).toEqual({ message: "You do not have any past or present application." });
    });
  });

  describe("when a database error occurs", () => {
    it("should return 500 and an error message", async () => {
      const mockConnection = {
        getConnection: jest.fn().mockResolvedValue({
          query: jest.fn().mockRejectedValue(new Error("Database error")),
          release: jest.fn(),
        }),
      };

      connection.mockResolvedValue(mockConnection);

      const response = await GET(mockRequest);

      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData).toEqual({ message: "Internal server error" });
    });
  });
});
