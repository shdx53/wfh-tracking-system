function cov_1eilgyerxq() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/teams/route.js";
  var hash = "4168b2556445490426cc9ac58869cc1658d2b70e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/teams/route.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 67,
          column: 3
        }
      },
      "1": {
        start: {
          line: 10,
          column: 17
        },
        end: {
          line: 10,
          column: 35
        }
      },
      "2": {
        start: {
          line: 13,
          column: 17
        },
        end: {
          line: 13,
          column: 43
        }
      },
      "3": {
        start: {
          line: 15,
          column: 25
        },
        end: {
          line: 15,
          column: 53
        }
      },
      "4": {
        start: {
          line: 18,
          column: 20
        },
        end: {
          line: 18,
          column: 47
        }
      },
      "5": {
        start: {
          line: 20,
          column: 22
        },
        end: {
          line: 20,
          column: 51
        }
      },
      "6": {
        start: {
          line: 23,
          column: 19
        },
        end: {
          line: 52,
          column: 5
        }
      },
      "7": {
        start: {
          line: 55,
          column: 4
        },
        end: {
          line: 55,
          column: 19
        }
      },
      "8": {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 58,
          column: 52
        }
      },
      "9": {
        start: {
          line: 60,
          column: 4
        },
        end: {
          line: 66,
          column: 6
        }
      }
    },
    fnMap: {
      "0": {
        name: "GET",
        decl: {
          start: {
            line: 7,
            column: 22
          },
          end: {
            line: 7,
            column: 25
          }
        },
        loc: {
          start: {
            line: 7,
            column: 35
          },
          end: {
            line: 68,
            column: 1
          }
        },
        line: 7
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "4168b2556445490426cc9ac58869cc1658d2b70e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1eilgyerxq = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1eilgyerxq();
import connection from "../../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests/teams?staffID=Staff_ID

// Fetch all TEAMs approved arrangements - Manager, Director to get schedule of teams under them, Staff to get own team schedule (Manager will get both team under them and own schedule) - also gets the staff who are in office
export async function GET(request) {
  cov_1eilgyerxq().f[0]++;
  cov_1eilgyerxq().s[0]++;
  try {
    // Establish the connection using the pool
    const pool = (cov_1eilgyerxq().s[1]++, await connection());

    // Get a connection from the pool
    const conn = (cov_1eilgyerxq().s[2]++, await pool.getConnection());
    const searchParams = (cov_1eilgyerxq().s[3]++, request.nextUrl.searchParams);

    // Get Staff_ID input from the request
    const staffID = (cov_1eilgyerxq().s[4]++, searchParams.get("staffID"));
    // Get Start_Date input from the request
    const startDate = (cov_1eilgyerxq().s[5]++, searchParams.get("startDate"));

    // Execute the query
    const [data] = (cov_1eilgyerxq().s[6]++, await conn.query(`SELECT e.Staff_ID, e.Staff_FName, e.Staff_LName, COALESCE(a.Start_Date, NULL) AS Start_Date, COALESCE(a.Shift_Type, NULL) AS Shift_Type, e.Position
      FROM Employee e
      LEFT JOIN Arrangement a 
      ON e.Staff_ID = a.Staff_ID 
      AND a.Request_Status = 'approved'
      AND a.Start_Date = ?
      WHERE e.Reporting_Manager = ? 
      AND e.Position != 'MD' 
      AND e.Position != 'Director'
      
      UNION
      
      SELECT e.Staff_ID, e.Staff_FName, e.Staff_LName, COALESCE(a.Start_Date, NULL) AS Start_Date, COALESCE(a.Shift_Type, NULL) AS Shift_Type, e.Position
      FROM Arrangement a 
      RIGHT JOIN Employee e
      ON a.Staff_ID = e.Staff_ID 
      AND a.Request_Status = 'approved' 
      AND a.Start_Date = ?
      WHERE e.Staff_ID IN 
      (SELECT e2.Staff_ID
      FROM Employee e1
      INNER JOIN Employee e2
      ON e1.Position = e2.Position 
      AND e1.Reporting_Manager = e2.Reporting_Manager 
      AND e1.Position != 'Director' 
      AND e1.Position != 'MD' 
      AND e1.Staff_ID = ?);`, [startDate, staffID, startDate, staffID]));

    // Release the connection back to the pool
    cov_1eilgyerxq().s[7]++;
    conn.release();

    // Return the fetched data as a JSON response
    cov_1eilgyerxq().s[8]++;
    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    cov_1eilgyerxq().s[9]++;
    return NextResponse.json({
      message: "Internal server error",
      details: error.message // Include error message for debugging
    }, {
      status: 500
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWVpbGd5ZXJ4cSIsImFjdHVhbENvdmVyYWdlIiwiY29ubmVjdGlvbiIsIk5leHRSZXNwb25zZSIsIkdFVCIsInJlcXVlc3QiLCJmIiwicyIsInBvb2wiLCJjb25uIiwiZ2V0Q29ubmVjdGlvbiIsInNlYXJjaFBhcmFtcyIsIm5leHRVcmwiLCJzdGFmZklEIiwiZ2V0Iiwic3RhcnREYXRlIiwiZGF0YSIsInF1ZXJ5IiwicmVsZWFzZSIsImpzb24iLCJzdGF0dXMiLCJlcnJvciIsIm1lc3NhZ2UiLCJkZXRhaWxzIl0sInNvdXJjZXMiOlsicm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbm5lY3Rpb24gZnJvbSBcIi4uLy4uLy4uL2xpYi9kYlwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbi8vIEFQSSBFbmRwb2ludDogYXBpL3JlcXVlc3RzL3RlYW1zP3N0YWZmSUQ9U3RhZmZfSURcblxuLy8gRmV0Y2ggYWxsIFRFQU1zIGFwcHJvdmVkIGFycmFuZ2VtZW50cyAtIE1hbmFnZXIsIERpcmVjdG9yIHRvIGdldCBzY2hlZHVsZSBvZiB0ZWFtcyB1bmRlciB0aGVtLCBTdGFmZiB0byBnZXQgb3duIHRlYW0gc2NoZWR1bGUgKE1hbmFnZXIgd2lsbCBnZXQgYm90aCB0ZWFtIHVuZGVyIHRoZW0gYW5kIG93biBzY2hlZHVsZSkgLSBhbHNvIGdldHMgdGhlIHN0YWZmIHdobyBhcmUgaW4gb2ZmaWNlXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICAvLyBFc3RhYmxpc2ggdGhlIGNvbm5lY3Rpb24gdXNpbmcgdGhlIHBvb2xcbiAgICBjb25zdCBwb29sID0gYXdhaXQgY29ubmVjdGlvbigpO1xuXG4gICAgLy8gR2V0IGEgY29ubmVjdGlvbiBmcm9tIHRoZSBwb29sXG4gICAgY29uc3QgY29ubiA9IGF3YWl0IHBvb2wuZ2V0Q29ubmVjdGlvbigpO1xuXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gcmVxdWVzdC5uZXh0VXJsLnNlYXJjaFBhcmFtcztcblxuICAgIC8vIEdldCBTdGFmZl9JRCBpbnB1dCBmcm9tIHRoZSByZXF1ZXN0XG4gICAgY29uc3Qgc3RhZmZJRCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJzdGFmZklEXCIpO1xuICAgIC8vIEdldCBTdGFydF9EYXRlIGlucHV0IGZyb20gdGhlIHJlcXVlc3RcbiAgICBjb25zdCBzdGFydERhdGUgPSBzZWFyY2hQYXJhbXMuZ2V0KFwic3RhcnREYXRlXCIpO1xuXG4gICAgLy8gRXhlY3V0ZSB0aGUgcXVlcnlcbiAgICBjb25zdCBbZGF0YV0gPSBhd2FpdCBjb25uLnF1ZXJ5KFxuICAgICAgYFNFTEVDVCBlLlN0YWZmX0lELCBlLlN0YWZmX0ZOYW1lLCBlLlN0YWZmX0xOYW1lLCBDT0FMRVNDRShhLlN0YXJ0X0RhdGUsIE5VTEwpIEFTIFN0YXJ0X0RhdGUsIENPQUxFU0NFKGEuU2hpZnRfVHlwZSwgTlVMTCkgQVMgU2hpZnRfVHlwZSwgZS5Qb3NpdGlvblxuICAgICAgRlJPTSBFbXBsb3llZSBlXG4gICAgICBMRUZUIEpPSU4gQXJyYW5nZW1lbnQgYSBcbiAgICAgIE9OIGUuU3RhZmZfSUQgPSBhLlN0YWZmX0lEIFxuICAgICAgQU5EIGEuUmVxdWVzdF9TdGF0dXMgPSAnYXBwcm92ZWQnXG4gICAgICBBTkQgYS5TdGFydF9EYXRlID0gP1xuICAgICAgV0hFUkUgZS5SZXBvcnRpbmdfTWFuYWdlciA9ID8gXG4gICAgICBBTkQgZS5Qb3NpdGlvbiAhPSAnTUQnIFxuICAgICAgQU5EIGUuUG9zaXRpb24gIT0gJ0RpcmVjdG9yJ1xuICAgICAgXG4gICAgICBVTklPTlxuICAgICAgXG4gICAgICBTRUxFQ1QgZS5TdGFmZl9JRCwgZS5TdGFmZl9GTmFtZSwgZS5TdGFmZl9MTmFtZSwgQ09BTEVTQ0UoYS5TdGFydF9EYXRlLCBOVUxMKSBBUyBTdGFydF9EYXRlLCBDT0FMRVNDRShhLlNoaWZ0X1R5cGUsIE5VTEwpIEFTIFNoaWZ0X1R5cGUsIGUuUG9zaXRpb25cbiAgICAgIEZST00gQXJyYW5nZW1lbnQgYSBcbiAgICAgIFJJR0hUIEpPSU4gRW1wbG95ZWUgZVxuICAgICAgT04gYS5TdGFmZl9JRCA9IGUuU3RhZmZfSUQgXG4gICAgICBBTkQgYS5SZXF1ZXN0X1N0YXR1cyA9ICdhcHByb3ZlZCcgXG4gICAgICBBTkQgYS5TdGFydF9EYXRlID0gP1xuICAgICAgV0hFUkUgZS5TdGFmZl9JRCBJTiBcbiAgICAgIChTRUxFQ1QgZTIuU3RhZmZfSURcbiAgICAgIEZST00gRW1wbG95ZWUgZTFcbiAgICAgIElOTkVSIEpPSU4gRW1wbG95ZWUgZTJcbiAgICAgIE9OIGUxLlBvc2l0aW9uID0gZTIuUG9zaXRpb24gXG4gICAgICBBTkQgZTEuUmVwb3J0aW5nX01hbmFnZXIgPSBlMi5SZXBvcnRpbmdfTWFuYWdlciBcbiAgICAgIEFORCBlMS5Qb3NpdGlvbiAhPSAnRGlyZWN0b3InIFxuICAgICAgQU5EIGUxLlBvc2l0aW9uICE9ICdNRCcgXG4gICAgICBBTkQgZTEuU3RhZmZfSUQgPSA/KTtgLFxuICAgICAgW3N0YXJ0RGF0ZSwgc3RhZmZJRCwgc3RhcnREYXRlLCBzdGFmZklEXSxcbiAgICApO1xuXG4gICAgLy8gUmVsZWFzZSB0aGUgY29ubmVjdGlvbiBiYWNrIHRvIHRoZSBwb29sXG4gICAgY29ubi5yZWxlYXNlKCk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGZldGNoZWQgZGF0YSBhcyBhIEpTT04gcmVzcG9uc2VcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7XG4gICAgICAgIG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIsXG4gICAgICAgIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UsIC8vIEluY2x1ZGUgZXJyb3IgbWVzc2FnZSBmb3IgZGVidWdnaW5nXG4gICAgICB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxVQUFVLE1BQU0saUJBQWlCO0FBQ3hDLFNBQVNDLFlBQVksUUFBUSxhQUFhOztBQUUxQzs7QUFFQTtBQUNBLE9BQU8sZUFBZUMsR0FBR0EsQ0FBQ0MsT0FBTyxFQUFFO0VBQUFMLGNBQUEsR0FBQU0sQ0FBQTtFQUFBTixjQUFBLEdBQUFPLENBQUE7RUFDakMsSUFBSTtJQUNGO0lBQ0EsTUFBTUMsSUFBSSxJQUFBUixjQUFBLEdBQUFPLENBQUEsT0FBRyxNQUFNTCxVQUFVLENBQUMsQ0FBQzs7SUFFL0I7SUFDQSxNQUFNTyxJQUFJLElBQUFULGNBQUEsR0FBQU8sQ0FBQSxPQUFHLE1BQU1DLElBQUksQ0FBQ0UsYUFBYSxDQUFDLENBQUM7SUFFdkMsTUFBTUMsWUFBWSxJQUFBWCxjQUFBLEdBQUFPLENBQUEsT0FBR0YsT0FBTyxDQUFDTyxPQUFPLENBQUNELFlBQVk7O0lBRWpEO0lBQ0EsTUFBTUUsT0FBTyxJQUFBYixjQUFBLEdBQUFPLENBQUEsT0FBR0ksWUFBWSxDQUFDRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQzNDO0lBQ0EsTUFBTUMsU0FBUyxJQUFBZixjQUFBLEdBQUFPLENBQUEsT0FBR0ksWUFBWSxDQUFDRyxHQUFHLENBQUMsV0FBVyxDQUFDOztJQUUvQztJQUNBLE1BQU0sQ0FBQ0UsSUFBSSxDQUFDLElBQUFoQixjQUFBLEdBQUFPLENBQUEsT0FBRyxNQUFNRSxJQUFJLENBQUNRLEtBQUssQ0FDN0I7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixFQUN0QixDQUFDRixTQUFTLEVBQUVGLE9BQU8sRUFBRUUsU0FBUyxFQUFFRixPQUFPLENBQ3pDLENBQUM7O0lBRUQ7SUFBQWIsY0FBQSxHQUFBTyxDQUFBO0lBQ0FFLElBQUksQ0FBQ1MsT0FBTyxDQUFDLENBQUM7O0lBRWQ7SUFBQWxCLGNBQUEsR0FBQU8sQ0FBQTtJQUNBLE9BQU9KLFlBQVksQ0FBQ2dCLElBQUksQ0FBQ0gsSUFBSSxFQUFFO01BQUVJLE1BQU0sRUFBRTtJQUFJLENBQUMsQ0FBQztFQUNqRCxDQUFDLENBQUMsT0FBT0MsS0FBSyxFQUFFO0lBQUFyQixjQUFBLEdBQUFPLENBQUE7SUFDZCxPQUFPSixZQUFZLENBQUNnQixJQUFJLENBQ3RCO01BQ0VHLE9BQU8sRUFBRSx1QkFBdUI7TUFDaENDLE9BQU8sRUFBRUYsS0FBSyxDQUFDQyxPQUFPLENBQUU7SUFDMUIsQ0FBQyxFQUNEO01BQUVGLE1BQU0sRUFBRTtJQUFJLENBQ2hCLENBQUM7RUFDSDtBQUNGIiwiaWdub3JlTGlzdCI6W119