function cov_ue7jt23wm() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/teams/route.js";
  var hash = "59a3ba14fd47c1b2749b51f6c2012e334f461b69";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/teams/route.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 22,
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
          column: 19
        },
        end: {
          line: 13,
          column: 77
        }
      },
      "4": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 19
        }
      },
      "5": {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 19,
          column: 52
        }
      },
      "6": {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
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
            column: 28
          },
          end: {
            line: 23,
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
      "6": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "59a3ba14fd47c1b2749b51f6c2012e334f461b69"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_ue7jt23wm = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_ue7jt23wm();
import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  cov_ue7jt23wm().f[0]++;
  cov_ue7jt23wm().s[0]++;
  try {
    // Establish the connection using the pool
    const pool = (cov_ue7jt23wm().s[1]++, await connection());

    // Get a connection from the pool
    const conn = (cov_ue7jt23wm().s[2]++, await pool.getConnection());

    // Execute the query
    const [data] = (cov_ue7jt23wm().s[3]++, await conn.query("SELECT DISTINCT Position FROM Employee"));

    // Release the connection back to the pool
    cov_ue7jt23wm().s[4]++;
    conn.release();

    // Return the fetched data as a JSON response
    cov_ue7jt23wm().s[5]++;
    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    cov_ue7jt23wm().s[6]++;
    return NextResponse.json(error, {
      status: 500
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfdWU3anQyM3dtIiwiYWN0dWFsQ292ZXJhZ2UiLCJjb25uZWN0aW9uIiwiTmV4dFJlc3BvbnNlIiwiR0VUIiwiZiIsInMiLCJwb29sIiwiY29ubiIsImdldENvbm5lY3Rpb24iLCJkYXRhIiwicXVlcnkiLCJyZWxlYXNlIiwianNvbiIsInN0YXR1cyIsImVycm9yIl0sInNvdXJjZXMiOlsicm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbm5lY3Rpb24gZnJvbSBcIkAvYXBwL2xpYi9kYlwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgLy8gRXN0YWJsaXNoIHRoZSBjb25uZWN0aW9uIHVzaW5nIHRoZSBwb29sXG4gICAgY29uc3QgcG9vbCA9IGF3YWl0IGNvbm5lY3Rpb24oKTtcblxuICAgIC8vIEdldCBhIGNvbm5lY3Rpb24gZnJvbSB0aGUgcG9vbFxuICAgIGNvbnN0IGNvbm4gPSBhd2FpdCBwb29sLmdldENvbm5lY3Rpb24oKTtcblxuICAgIC8vIEV4ZWN1dGUgdGhlIHF1ZXJ5XG4gICAgY29uc3QgW2RhdGFdID0gYXdhaXQgY29ubi5xdWVyeShcIlNFTEVDVCBESVNUSU5DVCBQb3NpdGlvbiBGUk9NIEVtcGxveWVlXCIpO1xuXG4gICAgLy8gUmVsZWFzZSB0aGUgY29ubmVjdGlvbiBiYWNrIHRvIHRoZSBwb29sXG4gICAgY29ubi5yZWxlYXNlKCk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGZldGNoZWQgZGF0YSBhcyBhIEpTT04gcmVzcG9uc2VcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZXJyb3IsIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBT0UsVUFBVSxNQUFNLGNBQWM7QUFDckMsU0FBU0MsWUFBWSxRQUFRLGFBQWE7QUFFMUMsT0FBTyxlQUFlQyxHQUFHQSxDQUFBLEVBQUc7RUFBQUosYUFBQSxHQUFBSyxDQUFBO0VBQUFMLGFBQUEsR0FBQU0sQ0FBQTtFQUMxQixJQUFJO0lBQ0Y7SUFDQSxNQUFNQyxJQUFJLElBQUFQLGFBQUEsR0FBQU0sQ0FBQSxPQUFHLE1BQU1KLFVBQVUsQ0FBQyxDQUFDOztJQUUvQjtJQUNBLE1BQU1NLElBQUksSUFBQVIsYUFBQSxHQUFBTSxDQUFBLE9BQUcsTUFBTUMsSUFBSSxDQUFDRSxhQUFhLENBQUMsQ0FBQzs7SUFFdkM7SUFDQSxNQUFNLENBQUNDLElBQUksQ0FBQyxJQUFBVixhQUFBLEdBQUFNLENBQUEsT0FBRyxNQUFNRSxJQUFJLENBQUNHLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQzs7SUFFekU7SUFBQVgsYUFBQSxHQUFBTSxDQUFBO0lBQ0FFLElBQUksQ0FBQ0ksT0FBTyxDQUFDLENBQUM7O0lBRWQ7SUFBQVosYUFBQSxHQUFBTSxDQUFBO0lBQ0EsT0FBT0gsWUFBWSxDQUFDVSxJQUFJLENBQUNILElBQUksRUFBRTtNQUFFSSxNQUFNLEVBQUU7SUFBSSxDQUFDLENBQUM7RUFDakQsQ0FBQyxDQUFDLE9BQU9DLEtBQUssRUFBRTtJQUFBZixhQUFBLEdBQUFNLENBQUE7SUFDZCxPQUFPSCxZQUFZLENBQUNVLElBQUksQ0FBQ0UsS0FBSyxFQUFFO01BQUVELE1BQU0sRUFBRTtJQUFJLENBQUMsQ0FBQztFQUNsRDtBQUNGIiwiaWdub3JlTGlzdCI6W119