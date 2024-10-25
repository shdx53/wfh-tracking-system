function cov_ruaaclrs7() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/pending/recurring/[arrangementID]/route.js";
  var hash = "f3e8d35f67537f35a2b878f931c428c0777a5598";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/pending/recurring/[arrangementID]/route.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 2
        },
        end: {
          line: 43,
          column: 3
        }
      },
      "1": {
        start: {
          line: 8,
          column: 17
        },
        end: {
          line: 8,
          column: 35
        }
      },
      "2": {
        start: {
          line: 11,
          column: 17
        },
        end: {
          line: 11,
          column: 43
        }
      },
      "3": {
        start: {
          line: 14,
          column: 30
        },
        end: {
          line: 14,
          column: 36
        }
      },
      "4": {
        start: {
          line: 16,
          column: 19
        },
        end: {
          line: 34,
          column: 5
        }
      },
      "5": {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 37,
          column: 19
        }
      },
      "6": {
        start: {
          line: 40,
          column: 4
        },
        end: {
          line: 40,
          column: 52
        }
      },
      "7": {
        start: {
          line: 42,
          column: 4
        },
        end: {
          line: 42,
          column: 53
        }
      }
    },
    fnMap: {
      "0": {
        name: "GET",
        decl: {
          start: {
            line: 5,
            column: 22
          },
          end: {
            line: 5,
            column: 25
          }
        },
        loc: {
          start: {
            line: 5,
            column: 47
          },
          end: {
            line: 44,
            column: 1
          }
        },
        line: 5
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
      "7": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "f3e8d35f67537f35a2b878f931c428c0777a5598"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_ruaaclrs7 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_ruaaclrs7();
import connection from "@/app/lib/db";
import { NextResponse } from "next/server";

// Fetching pending recurring arrangements
export async function GET(request, {
  params
}) {
  cov_ruaaclrs7().f[0]++;
  cov_ruaaclrs7().s[0]++;
  try {
    // Establish the connection using the pool
    const pool = (cov_ruaaclrs7().s[1]++, await connection());

    // Get a connection from the pool
    const conn = (cov_ruaaclrs7().s[2]++, await pool.getConnection());

    // Get Arrangement_ID from the params
    const {
      arrangementID
    } = (cov_ruaaclrs7().s[3]++, params);
    const [data] = (cov_ruaaclrs7().s[4]++, await conn.query(`
          SELECT Arrangement_ID, Start_Date
          FROM Arrangement
          WHERE Applied_Datetime = (
            SELECT Applied_Datetime 
            FROM Arrangement
            WHERE Arrangement_ID = ?
          )
          AND Staff_ID = (
            SELECT Staff_ID
            FROM Arrangement
            WHERE Arrangement_ID = ?
          )
          AND Request_Status = "pending"
          AND Is_Recurring = 1;
        `, [arrangementID, arrangementID]));

    // Release the connection back to the pool
    cov_ruaaclrs7().s[5]++;
    conn.release();

    // Return the fetched data as a JSON response
    cov_ruaaclrs7().s[6]++;
    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    cov_ruaaclrs7().s[7]++;
    return NextResponse.json(error, {
      status: 500
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfcnVhYWNscnM3IiwiYWN0dWFsQ292ZXJhZ2UiLCJjb25uZWN0aW9uIiwiTmV4dFJlc3BvbnNlIiwiR0VUIiwicmVxdWVzdCIsInBhcmFtcyIsImYiLCJzIiwicG9vbCIsImNvbm4iLCJnZXRDb25uZWN0aW9uIiwiYXJyYW5nZW1lbnRJRCIsImRhdGEiLCJxdWVyeSIsInJlbGVhc2UiLCJqc29uIiwic3RhdHVzIiwiZXJyb3IiXSwic291cmNlcyI6WyJyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29ubmVjdGlvbiBmcm9tIFwiQC9hcHAvbGliL2RiXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuLy8gRmV0Y2hpbmcgcGVuZGluZyByZWN1cnJpbmcgYXJyYW5nZW1lbnRzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QsIHsgcGFyYW1zIH0pIHtcbiAgdHJ5IHtcbiAgICAvLyBFc3RhYmxpc2ggdGhlIGNvbm5lY3Rpb24gdXNpbmcgdGhlIHBvb2xcbiAgICBjb25zdCBwb29sID0gYXdhaXQgY29ubmVjdGlvbigpO1xuXG4gICAgLy8gR2V0IGEgY29ubmVjdGlvbiBmcm9tIHRoZSBwb29sXG4gICAgY29uc3QgY29ubiA9IGF3YWl0IHBvb2wuZ2V0Q29ubmVjdGlvbigpO1xuXG4gICAgLy8gR2V0IEFycmFuZ2VtZW50X0lEIGZyb20gdGhlIHBhcmFtc1xuICAgIGNvbnN0IHsgYXJyYW5nZW1lbnRJRCB9ID0gcGFyYW1zO1xuXG4gICAgY29uc3QgW2RhdGFdID0gYXdhaXQgY29ubi5xdWVyeShcbiAgICAgIGBcbiAgICAgICAgICBTRUxFQ1QgQXJyYW5nZW1lbnRfSUQsIFN0YXJ0X0RhdGVcbiAgICAgICAgICBGUk9NIEFycmFuZ2VtZW50XG4gICAgICAgICAgV0hFUkUgQXBwbGllZF9EYXRldGltZSA9IChcbiAgICAgICAgICAgIFNFTEVDVCBBcHBsaWVkX0RhdGV0aW1lIFxuICAgICAgICAgICAgRlJPTSBBcnJhbmdlbWVudFxuICAgICAgICAgICAgV0hFUkUgQXJyYW5nZW1lbnRfSUQgPSA/XG4gICAgICAgICAgKVxuICAgICAgICAgIEFORCBTdGFmZl9JRCA9IChcbiAgICAgICAgICAgIFNFTEVDVCBTdGFmZl9JRFxuICAgICAgICAgICAgRlJPTSBBcnJhbmdlbWVudFxuICAgICAgICAgICAgV0hFUkUgQXJyYW5nZW1lbnRfSUQgPSA/XG4gICAgICAgICAgKVxuICAgICAgICAgIEFORCBSZXF1ZXN0X1N0YXR1cyA9IFwicGVuZGluZ1wiXG4gICAgICAgICAgQU5EIElzX1JlY3VycmluZyA9IDE7XG4gICAgICAgIGAsXG4gICAgICBbYXJyYW5nZW1lbnRJRCwgYXJyYW5nZW1lbnRJRF0sXG4gICAgKTtcblxuICAgIC8vIFJlbGVhc2UgdGhlIGNvbm5lY3Rpb24gYmFjayB0byB0aGUgcG9vbFxuICAgIGNvbm4ucmVsZWFzZSgpO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBmZXRjaGVkIGRhdGEgYXMgYSBKU09OIHJlc3BvbnNlXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEsIHsgc3RhdHVzOiAyMDAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGVycm9yLCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBT0UsVUFBVSxNQUFNLGNBQWM7QUFDckMsU0FBU0MsWUFBWSxRQUFRLGFBQWE7O0FBRTFDO0FBQ0EsT0FBTyxlQUFlQyxHQUFHQSxDQUFDQyxPQUFPLEVBQUU7RUFBRUM7QUFBTyxDQUFDLEVBQUU7RUFBQU4sYUFBQSxHQUFBTyxDQUFBO0VBQUFQLGFBQUEsR0FBQVEsQ0FBQTtFQUM3QyxJQUFJO0lBQ0Y7SUFDQSxNQUFNQyxJQUFJLElBQUFULGFBQUEsR0FBQVEsQ0FBQSxPQUFHLE1BQU1OLFVBQVUsQ0FBQyxDQUFDOztJQUUvQjtJQUNBLE1BQU1RLElBQUksSUFBQVYsYUFBQSxHQUFBUSxDQUFBLE9BQUcsTUFBTUMsSUFBSSxDQUFDRSxhQUFhLENBQUMsQ0FBQzs7SUFFdkM7SUFDQSxNQUFNO01BQUVDO0lBQWMsQ0FBQyxJQUFBWixhQUFBLEdBQUFRLENBQUEsT0FBR0YsTUFBTTtJQUVoQyxNQUFNLENBQUNPLElBQUksQ0FBQyxJQUFBYixhQUFBLEdBQUFRLENBQUEsT0FBRyxNQUFNRSxJQUFJLENBQUNJLEtBQUssQ0FDN0I7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxFQUNILENBQUNGLGFBQWEsRUFBRUEsYUFBYSxDQUMvQixDQUFDOztJQUVEO0lBQUFaLGFBQUEsR0FBQVEsQ0FBQTtJQUNBRSxJQUFJLENBQUNLLE9BQU8sQ0FBQyxDQUFDOztJQUVkO0lBQUFmLGFBQUEsR0FBQVEsQ0FBQTtJQUNBLE9BQU9MLFlBQVksQ0FBQ2EsSUFBSSxDQUFDSCxJQUFJLEVBQUU7TUFBRUksTUFBTSxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQ2pELENBQUMsQ0FBQyxPQUFPQyxLQUFLLEVBQUU7SUFBQWxCLGFBQUEsR0FBQVEsQ0FBQTtJQUNkLE9BQU9MLFlBQVksQ0FBQ2EsSUFBSSxDQUFDRSxLQUFLLEVBQUU7TUFBRUQsTUFBTSxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQ2xEO0FBQ0YiLCJpZ25vcmVMaXN0IjpbXX0=