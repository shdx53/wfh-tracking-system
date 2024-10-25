function cov_259wnqwkrl() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/employees/route.js";
  var hash = "af199207faa09bac5352456a411acdc7bb0f8c6e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/employees/route.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 26,
          column: 3
        }
      },
      "1": {
        start: {
          line: 7,
          column: 17
        },
        end: {
          line: 7,
          column: 35
        }
      },
      "2": {
        start: {
          line: 10,
          column: 17
        },
        end: {
          line: 10,
          column: 43
        }
      },
      "3": {
        start: {
          line: 13,
          column: 25
        },
        end: {
          line: 13,
          column: 53
        }
      },
      "4": {
        start: {
          line: 14,
          column: 20
        },
        end: {
          line: 14,
          column: 47
        }
      },
      "5": {
        start: {
          line: 17,
          column: 19
        },
        end: {
          line: 17,
          column: 96
        }
      },
      "6": {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 20,
          column: 19
        }
      },
      "7": {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 52
        }
      },
      "8": {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 53
        }
      }
    },
    fnMap: {
      "0": {
        name: "GET",
        decl: {
          start: {
            line: 4,
            column: 22
          },
          end: {
            line: 4,
            column: 25
          }
        },
        loc: {
          start: {
            line: 4,
            column: 35
          },
          end: {
            line: 27,
            column: 1
          }
        },
        line: 4
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
      "8": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "af199207faa09bac5352456a411acdc7bb0f8c6e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_259wnqwkrl = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_259wnqwkrl();
import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function GET(request) {
  cov_259wnqwkrl().f[0]++;
  cov_259wnqwkrl().s[0]++;
  try {
    // Establish the connection using the pool
    const pool = (cov_259wnqwkrl().s[1]++, await connection());

    // Get a connection from the pool
    const conn = (cov_259wnqwkrl().s[2]++, await pool.getConnection());

    // Get Staff_ID from the request
    const searchParams = (cov_259wnqwkrl().s[3]++, request.nextUrl.searchParams);
    const staffID = (cov_259wnqwkrl().s[4]++, searchParams.get("staffID"));

    // Execute the query
    const [data] = (cov_259wnqwkrl().s[5]++, await conn.query(`SELECT Position FROM Employee WHERE Staff_ID = ${staffID}`));

    // Release the connection back to the pool
    cov_259wnqwkrl().s[6]++;
    conn.release();

    // Return the fetched data as a JSON response
    cov_259wnqwkrl().s[7]++;
    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    cov_259wnqwkrl().s[8]++;
    return NextResponse.json(error, {
      status: 500
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjU5d25xd2tybCIsImFjdHVhbENvdmVyYWdlIiwiY29ubmVjdGlvbiIsIk5leHRSZXNwb25zZSIsIkdFVCIsInJlcXVlc3QiLCJmIiwicyIsInBvb2wiLCJjb25uIiwiZ2V0Q29ubmVjdGlvbiIsInNlYXJjaFBhcmFtcyIsIm5leHRVcmwiLCJzdGFmZklEIiwiZ2V0IiwiZGF0YSIsInF1ZXJ5IiwicmVsZWFzZSIsImpzb24iLCJzdGF0dXMiLCJlcnJvciJdLCJzb3VyY2VzIjpbInJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25uZWN0aW9uIGZyb20gXCJAL2FwcC9saWIvZGJcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICAvLyBFc3RhYmxpc2ggdGhlIGNvbm5lY3Rpb24gdXNpbmcgdGhlIHBvb2xcbiAgICBjb25zdCBwb29sID0gYXdhaXQgY29ubmVjdGlvbigpO1xuXG4gICAgLy8gR2V0IGEgY29ubmVjdGlvbiBmcm9tIHRoZSBwb29sXG4gICAgY29uc3QgY29ubiA9IGF3YWl0IHBvb2wuZ2V0Q29ubmVjdGlvbigpO1xuXG4gICAgLy8gR2V0IFN0YWZmX0lEIGZyb20gdGhlIHJlcXVlc3RcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSByZXF1ZXN0Lm5leHRVcmwuc2VhcmNoUGFyYW1zO1xuICAgIGNvbnN0IHN0YWZmSUQgPSBzZWFyY2hQYXJhbXMuZ2V0KFwic3RhZmZJRFwiKTtcblxuICAgIC8vIEV4ZWN1dGUgdGhlIHF1ZXJ5XG4gICAgY29uc3QgW2RhdGFdID0gYXdhaXQgY29ubi5xdWVyeShgU0VMRUNUIFBvc2l0aW9uIEZST00gRW1wbG95ZWUgV0hFUkUgU3RhZmZfSUQgPSAke3N0YWZmSUR9YCk7XG5cbiAgICAvLyBSZWxlYXNlIHRoZSBjb25uZWN0aW9uIGJhY2sgdG8gdGhlIHBvb2xcbiAgICBjb25uLnJlbGVhc2UoKTtcblxuICAgIC8vIFJldHVybiB0aGUgZmV0Y2hlZCBkYXRhIGFzIGEgSlNPTiByZXNwb25zZVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhLCB7IHN0YXR1czogMjAwIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihlcnJvciwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosT0FBT0UsVUFBVSxNQUFNLGNBQWM7QUFDckMsU0FBU0MsWUFBWSxRQUFRLGFBQWE7QUFFMUMsT0FBTyxlQUFlQyxHQUFHQSxDQUFDQyxPQUFPLEVBQUU7RUFBQUwsY0FBQSxHQUFBTSxDQUFBO0VBQUFOLGNBQUEsR0FBQU8sQ0FBQTtFQUNqQyxJQUFJO0lBQ0Y7SUFDQSxNQUFNQyxJQUFJLElBQUFSLGNBQUEsR0FBQU8sQ0FBQSxPQUFHLE1BQU1MLFVBQVUsQ0FBQyxDQUFDOztJQUUvQjtJQUNBLE1BQU1PLElBQUksSUFBQVQsY0FBQSxHQUFBTyxDQUFBLE9BQUcsTUFBTUMsSUFBSSxDQUFDRSxhQUFhLENBQUMsQ0FBQzs7SUFFdkM7SUFDQSxNQUFNQyxZQUFZLElBQUFYLGNBQUEsR0FBQU8sQ0FBQSxPQUFHRixPQUFPLENBQUNPLE9BQU8sQ0FBQ0QsWUFBWTtJQUNqRCxNQUFNRSxPQUFPLElBQUFiLGNBQUEsR0FBQU8sQ0FBQSxPQUFHSSxZQUFZLENBQUNHLEdBQUcsQ0FBQyxTQUFTLENBQUM7O0lBRTNDO0lBQ0EsTUFBTSxDQUFDQyxJQUFJLENBQUMsSUFBQWYsY0FBQSxHQUFBTyxDQUFBLE9BQUcsTUFBTUUsSUFBSSxDQUFDTyxLQUFLLENBQUMsa0RBQWtESCxPQUFPLEVBQUUsQ0FBQzs7SUFFNUY7SUFBQWIsY0FBQSxHQUFBTyxDQUFBO0lBQ0FFLElBQUksQ0FBQ1EsT0FBTyxDQUFDLENBQUM7O0lBRWQ7SUFBQWpCLGNBQUEsR0FBQU8sQ0FBQTtJQUNBLE9BQU9KLFlBQVksQ0FBQ2UsSUFBSSxDQUFDSCxJQUFJLEVBQUU7TUFBRUksTUFBTSxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQ2pELENBQUMsQ0FBQyxPQUFPQyxLQUFLLEVBQUU7SUFBQXBCLGNBQUEsR0FBQU8sQ0FBQTtJQUNkLE9BQU9KLFlBQVksQ0FBQ2UsSUFBSSxDQUFDRSxLQUFLLEVBQUU7TUFBRUQsTUFBTSxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQ2xEO0FBQ0YiLCJpZ25vcmVMaXN0IjpbXX0=