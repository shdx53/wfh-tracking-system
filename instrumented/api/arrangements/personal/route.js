function cov_3ud1bytrr() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/personal/route.js";
  var hash = "c8f45e9e0189c06b1eb7e4c4f603a056db2b4a7e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/personal/route.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 69,
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
          column: 4
        },
        end: {
          line: 13,
          column: 38
        }
      },
      "3": {
        start: {
          line: 16,
          column: 25
        },
        end: {
          line: 16,
          column: 53
        }
      },
      "4": {
        start: {
          line: 17,
          column: 20
        },
        end: {
          line: 17,
          column: 47
        }
      },
      "5": {
        start: {
          line: 20,
          column: 19
        },
        end: {
          line: 48,
          column: 5
        }
      },
      "6": {
        start: {
          line: 51,
          column: 4
        },
        end: {
          line: 56,
          column: 5
        }
      },
      "7": {
        start: {
          line: 52,
          column: 6
        },
        end: {
          line: 55,
          column: 8
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
          line: 63,
          column: 6
        }
      },
      "10": {
        start: {
          line: 66,
          column: 4
        },
        end: {
          line: 68,
          column: 5
        }
      },
      "11": {
        start: {
          line: 67,
          column: 6
        },
        end: {
          line: 67,
          column: 21
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
            column: 35
          },
          end: {
            line: 70,
            column: 1
          }
        },
        line: 5
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 51,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 51,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        }, {
          start: {
            line: undefined,
            column: undefined
          },
          end: {
            line: undefined,
            column: undefined
          }
        }],
        line: 51
      },
      "1": {
        loc: {
          start: {
            line: 66,
            column: 4
          },
          end: {
            line: 68,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 66,
            column: 4
          },
          end: {
            line: 68,
            column: 5
          }
        }, {
          start: {
            line: undefined,
            column: undefined
          },
          end: {
            line: undefined,
            column: undefined
          }
        }],
        line: 66
      }
    },
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
      "9": 0,
      "10": 0,
      "11": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c8f45e9e0189c06b1eb7e4c4f603a056db2b4a7e"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_3ud1bytrr = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_3ud1bytrr();
import connection from "@/app/lib/db";
import { NextResponse } from "next/server";

// Example Endpoint: http://localhost:3000/api/requests/all-personal-arrangement?staffID=150085
export async function GET(request) {
  cov_3ud1bytrr().f[0]++;
  let conn; // Declare conn outside of try block for access in finally
  cov_3ud1bytrr().s[0]++;
  try {
    // Establish the connection using the pool
    const pool = (cov_3ud1bytrr().s[1]++, await connection());

    // Get a connection from the pool
    cov_3ud1bytrr().s[2]++;
    conn = await pool.getConnection();

    // Get Staff_ID input from the request
    const searchParams = (cov_3ud1bytrr().s[3]++, request.nextUrl.searchParams);
    const staffID = (cov_3ud1bytrr().s[4]++, searchParams.get("staffID"));

    // Execute query to retrieve all arrangements of one staff
    const [data] = (cov_3ud1bytrr().s[5]++, await conn.query(`
      SELECT Arrangement_ID, Request_Status,
              Applied_Datetime, Start_Date,
              Recurring_Interval, End_Date,
              Apply_Reason, Update_Reason, Shift_Type
      FROM Arrangement
      WHERE Staff_ID = ?
      AND Arrangement.Is_Recurring = 0
      
      UNION
      
      SELECT
      GROUP_CONCAT(Arrangement.Arrangement_ID) AS Arrangement_ID,
      GROUP_CONCAT(Arrangement.Request_Status) AS Request_Status,
      GROUP_CONCAT(Arrangement.Applied_Datetime) AS Applied_Datetime,
      GROUP_CONCAT(Arrangement.Start_Date) AS Start_Date,  
      GROUP_CONCAT(Arrangement.Recurring_Interval) AS Recurring_Interval,  
      GROUP_CONCAT(Arrangement.End_Date) AS End_Date,
      GROUP_CONCAT(Arrangement.Apply_Reason) AS Apply_Reason,
      GROUP_CONCAT(Arrangement.Update_Reason) AS Update_Reason,
      GROUP_CONCAT(Arrangement.Shift_Type) AS Shift_Type
      FROM Arrangement
      WHERE Staff_ID = ?
      AND Arrangement.Is_Recurring = 1
      AND Arrangement.Request_Status = 'pending'
      GROUP BY Arrangement.Recurring_Interval, Arrangement.End_Date, Arrangement.Shift_Type;`, [staffID, staffID]));

    // return a response if a staff does not have any arrangements
    cov_3ud1bytrr().s[6]++;
    if (!data.length) {
      cov_3ud1bytrr().b[0][0]++;
      cov_3ud1bytrr().s[7]++;
      return NextResponse.json({
        message: "You do not have any past or present application."
      }, {
        status: 200
      });
    } else {
      cov_3ud1bytrr().b[0][1]++;
    }
    cov_3ud1bytrr().s[8]++;
    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    cov_3ud1bytrr().s[9]++;
    return NextResponse.json({
      message: "Internal server error"
    },
    // Remove details for consistency with tests
    {
      status: 500
    });
  } finally {
    cov_3ud1bytrr().s[10]++;
    // Release the connection back to the pool if it was established
    if (conn) {
      cov_3ud1bytrr().b[1][0]++;
      cov_3ud1bytrr().s[11]++;
      conn.release();
    } else {
      cov_3ud1bytrr().b[1][1]++;
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfM3VkMWJ5dHJyIiwiYWN0dWFsQ292ZXJhZ2UiLCJjb25uZWN0aW9uIiwiTmV4dFJlc3BvbnNlIiwiR0VUIiwicmVxdWVzdCIsImYiLCJjb25uIiwicyIsInBvb2wiLCJnZXRDb25uZWN0aW9uIiwic2VhcmNoUGFyYW1zIiwibmV4dFVybCIsInN0YWZmSUQiLCJnZXQiLCJkYXRhIiwicXVlcnkiLCJsZW5ndGgiLCJiIiwianNvbiIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJlcnJvciIsInJlbGVhc2UiXSwic291cmNlcyI6WyJyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29ubmVjdGlvbiBmcm9tIFwiQC9hcHAvbGliL2RiXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuLy8gRXhhbXBsZSBFbmRwb2ludDogaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9yZXF1ZXN0cy9hbGwtcGVyc29uYWwtYXJyYW5nZW1lbnQ/c3RhZmZJRD0xNTAwODVcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCkge1xuICBsZXQgY29ubjsgLy8gRGVjbGFyZSBjb25uIG91dHNpZGUgb2YgdHJ5IGJsb2NrIGZvciBhY2Nlc3MgaW4gZmluYWxseVxuXG4gIHRyeSB7XG4gICAgLy8gRXN0YWJsaXNoIHRoZSBjb25uZWN0aW9uIHVzaW5nIHRoZSBwb29sXG4gICAgY29uc3QgcG9vbCA9IGF3YWl0IGNvbm5lY3Rpb24oKTtcblxuICAgIC8vIEdldCBhIGNvbm5lY3Rpb24gZnJvbSB0aGUgcG9vbFxuICAgIGNvbm4gPSBhd2FpdCBwb29sLmdldENvbm5lY3Rpb24oKTtcblxuICAgIC8vIEdldCBTdGFmZl9JRCBpbnB1dCBmcm9tIHRoZSByZXF1ZXN0XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gcmVxdWVzdC5uZXh0VXJsLnNlYXJjaFBhcmFtcztcbiAgICBjb25zdCBzdGFmZklEID0gc2VhcmNoUGFyYW1zLmdldChcInN0YWZmSURcIik7XG5cbiAgICAvLyBFeGVjdXRlIHF1ZXJ5IHRvIHJldHJpZXZlIGFsbCBhcnJhbmdlbWVudHMgb2Ygb25lIHN0YWZmXG4gICAgY29uc3QgW2RhdGFdID0gYXdhaXQgY29ubi5xdWVyeShcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBBcnJhbmdlbWVudF9JRCwgUmVxdWVzdF9TdGF0dXMsXG4gICAgICAgICAgICAgIEFwcGxpZWRfRGF0ZXRpbWUsIFN0YXJ0X0RhdGUsXG4gICAgICAgICAgICAgIFJlY3VycmluZ19JbnRlcnZhbCwgRW5kX0RhdGUsXG4gICAgICAgICAgICAgIEFwcGx5X1JlYXNvbiwgVXBkYXRlX1JlYXNvbiwgU2hpZnRfVHlwZVxuICAgICAgRlJPTSBBcnJhbmdlbWVudFxuICAgICAgV0hFUkUgU3RhZmZfSUQgPSA/XG4gICAgICBBTkQgQXJyYW5nZW1lbnQuSXNfUmVjdXJyaW5nID0gMFxuICAgICAgXG4gICAgICBVTklPTlxuICAgICAgXG4gICAgICBTRUxFQ1RcbiAgICAgIEdST1VQX0NPTkNBVChBcnJhbmdlbWVudC5BcnJhbmdlbWVudF9JRCkgQVMgQXJyYW5nZW1lbnRfSUQsXG4gICAgICBHUk9VUF9DT05DQVQoQXJyYW5nZW1lbnQuUmVxdWVzdF9TdGF0dXMpIEFTIFJlcXVlc3RfU3RhdHVzLFxuICAgICAgR1JPVVBfQ09OQ0FUKEFycmFuZ2VtZW50LkFwcGxpZWRfRGF0ZXRpbWUpIEFTIEFwcGxpZWRfRGF0ZXRpbWUsXG4gICAgICBHUk9VUF9DT05DQVQoQXJyYW5nZW1lbnQuU3RhcnRfRGF0ZSkgQVMgU3RhcnRfRGF0ZSwgIFxuICAgICAgR1JPVVBfQ09OQ0FUKEFycmFuZ2VtZW50LlJlY3VycmluZ19JbnRlcnZhbCkgQVMgUmVjdXJyaW5nX0ludGVydmFsLCAgXG4gICAgICBHUk9VUF9DT05DQVQoQXJyYW5nZW1lbnQuRW5kX0RhdGUpIEFTIEVuZF9EYXRlLFxuICAgICAgR1JPVVBfQ09OQ0FUKEFycmFuZ2VtZW50LkFwcGx5X1JlYXNvbikgQVMgQXBwbHlfUmVhc29uLFxuICAgICAgR1JPVVBfQ09OQ0FUKEFycmFuZ2VtZW50LlVwZGF0ZV9SZWFzb24pIEFTIFVwZGF0ZV9SZWFzb24sXG4gICAgICBHUk9VUF9DT05DQVQoQXJyYW5nZW1lbnQuU2hpZnRfVHlwZSkgQVMgU2hpZnRfVHlwZVxuICAgICAgRlJPTSBBcnJhbmdlbWVudFxuICAgICAgV0hFUkUgU3RhZmZfSUQgPSA/XG4gICAgICBBTkQgQXJyYW5nZW1lbnQuSXNfUmVjdXJyaW5nID0gMVxuICAgICAgQU5EIEFycmFuZ2VtZW50LlJlcXVlc3RfU3RhdHVzID0gJ3BlbmRpbmcnXG4gICAgICBHUk9VUCBCWSBBcnJhbmdlbWVudC5SZWN1cnJpbmdfSW50ZXJ2YWwsIEFycmFuZ2VtZW50LkVuZF9EYXRlLCBBcnJhbmdlbWVudC5TaGlmdF9UeXBlO2AsXG4gICAgICBbc3RhZmZJRCwgc3RhZmZJRF0sXG4gICAgKTtcblxuICAgIC8vIHJldHVybiBhIHJlc3BvbnNlIGlmIGEgc3RhZmYgZG9lcyBub3QgaGF2ZSBhbnkgYXJyYW5nZW1lbnRzXG4gICAgaWYgKCFkYXRhLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiWW91IGRvIG5vdCBoYXZlIGFueSBwYXN0IG9yIHByZXNlbnQgYXBwbGljYXRpb24uXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDIwMCB9LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSwgLy8gUmVtb3ZlIGRldGFpbHMgZm9yIGNvbnNpc3RlbmN5IHdpdGggdGVzdHNcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH0gZmluYWxseSB7XG4gICAgLy8gUmVsZWFzZSB0aGUgY29ubmVjdGlvbiBiYWNrIHRvIHRoZSBwb29sIGlmIGl0IHdhcyBlc3RhYmxpc2hlZFxuICAgIGlmIChjb25uKSB7XG4gICAgICBjb25uLnJlbGVhc2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixPQUFPRSxVQUFVLE1BQU0sY0FBYztBQUNyQyxTQUFTQyxZQUFZLFFBQVEsYUFBYTs7QUFFMUM7QUFDQSxPQUFPLGVBQWVDLEdBQUdBLENBQUNDLE9BQU8sRUFBRTtFQUFBTCxhQUFBLEdBQUFNLENBQUE7RUFDakMsSUFBSUMsSUFBSSxDQUFDLENBQUM7RUFBQVAsYUFBQSxHQUFBUSxDQUFBO0VBRVYsSUFBSTtJQUNGO0lBQ0EsTUFBTUMsSUFBSSxJQUFBVCxhQUFBLEdBQUFRLENBQUEsT0FBRyxNQUFNTixVQUFVLENBQUMsQ0FBQzs7SUFFL0I7SUFBQUYsYUFBQSxHQUFBUSxDQUFBO0lBQ0FELElBQUksR0FBRyxNQUFNRSxJQUFJLENBQUNDLGFBQWEsQ0FBQyxDQUFDOztJQUVqQztJQUNBLE1BQU1DLFlBQVksSUFBQVgsYUFBQSxHQUFBUSxDQUFBLE9BQUdILE9BQU8sQ0FBQ08sT0FBTyxDQUFDRCxZQUFZO0lBQ2pELE1BQU1FLE9BQU8sSUFBQWIsYUFBQSxHQUFBUSxDQUFBLE9BQUdHLFlBQVksQ0FBQ0csR0FBRyxDQUFDLFNBQVMsQ0FBQzs7SUFFM0M7SUFDQSxNQUFNLENBQUNDLElBQUksQ0FBQyxJQUFBZixhQUFBLEdBQUFRLENBQUEsT0FBRyxNQUFNRCxJQUFJLENBQUNTLEtBQUssQ0FDN0I7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RkFBNkYsRUFDdkYsQ0FBQ0gsT0FBTyxFQUFFQSxPQUFPLENBQ25CLENBQUM7O0lBRUQ7SUFBQWIsYUFBQSxHQUFBUSxDQUFBO0lBQ0EsSUFBSSxDQUFDTyxJQUFJLENBQUNFLE1BQU0sRUFBRTtNQUFBakIsYUFBQSxHQUFBa0IsQ0FBQTtNQUFBbEIsYUFBQSxHQUFBUSxDQUFBO01BQ2hCLE9BQU9MLFlBQVksQ0FBQ2dCLElBQUksQ0FDdEI7UUFBRUMsT0FBTyxFQUFFO01BQW1ELENBQUMsRUFDL0Q7UUFBRUMsTUFBTSxFQUFFO01BQUksQ0FDaEIsQ0FBQztJQUNILENBQUM7TUFBQXJCLGFBQUEsR0FBQWtCLENBQUE7SUFBQTtJQUFBbEIsYUFBQSxHQUFBUSxDQUFBO0lBRUQsT0FBT0wsWUFBWSxDQUFDZ0IsSUFBSSxDQUFDSixJQUFJLEVBQUU7TUFBRU0sTUFBTSxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQ2pELENBQUMsQ0FBQyxPQUFPQyxLQUFLLEVBQUU7SUFBQXRCLGFBQUEsR0FBQVEsQ0FBQTtJQUNkLE9BQU9MLFlBQVksQ0FBQ2dCLElBQUksQ0FDdEI7TUFBRUMsT0FBTyxFQUFFO0lBQXdCLENBQUM7SUFBRTtJQUN0QztNQUFFQyxNQUFNLEVBQUU7SUFBSSxDQUNoQixDQUFDO0VBQ0gsQ0FBQyxTQUFTO0lBQUFyQixhQUFBLEdBQUFRLENBQUE7SUFDUjtJQUNBLElBQUlELElBQUksRUFBRTtNQUFBUCxhQUFBLEdBQUFrQixDQUFBO01BQUFsQixhQUFBLEdBQUFRLENBQUE7TUFDUkQsSUFBSSxDQUFDZ0IsT0FBTyxDQUFDLENBQUM7SUFDaEIsQ0FBQztNQUFBdkIsYUFBQSxHQUFBa0IsQ0FBQTtJQUFBO0VBQ0g7QUFDRiIsImlnbm9yZUxpc3QiOltdfQ==