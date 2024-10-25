function cov_23a63kg2me() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/route.js";
  var hash = "99a463fe751a6c574f26f43b87107c8b4242b592";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/api/arrangements/route.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 61,
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
          column: 22
        },
        end: {
          line: 18,
          column: 51
        }
      },
      "5": {
        start: {
          line: 21,
          column: 17
        },
        end: {
          line: 21,
          column: 41
        }
      },
      "6": {
        start: {
          line: 26,
          column: 4
        },
        end: {
          line: 36,
          column: 5
        }
      },
      "7": {
        start: {
          line: 27,
          column: 21
        },
        end: {
          line: 34,
          column: 7
        }
      },
      "8": {
        start: {
          line: 35,
          column: 6
        },
        end: {
          line: 35,
          column: 18
        }
      },
      "9": {
        start: {
          line: 38,
          column: 4
        },
        end: {
          line: 52,
          column: 5
        }
      },
      "10": {
        start: {
          line: 39,
          column: 21
        },
        end: {
          line: 50,
          column: 7
        }
      },
      "11": {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 51,
          column: 18
        }
      },
      "12": {
        start: {
          line: 55,
          column: 4
        },
        end: {
          line: 55,
          column: 19
        }
      },
      "13": {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 58,
          column: 52
        }
      },
      "14": {
        start: {
          line: 60,
          column: 4
        },
        end: {
          line: 60,
          column: 53
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
            line: 62,
            column: 1
          }
        },
        line: 7
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 36,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 36,
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
        line: 26
      },
      "1": {
        loc: {
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 52,
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
        line: 38
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
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "99a463fe751a6c574f26f43b87107c8b4242b592"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_23a63kg2me = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_23a63kg2me();
import connection from "../../lib/db";
import { NextResponse } from "next/server";

// API Endpoint: api/requests

// Fetch ALL approved requests from the Arrangement table - and also who is in office
export async function GET(request) {
  cov_23a63kg2me().f[0]++;
  cov_23a63kg2me().s[0]++;
  try {
    // Establish the connection using the pool
    const pool = (cov_23a63kg2me().s[1]++, await connection());

    // Get a connection from the pool
    const conn = (cov_23a63kg2me().s[2]++, await pool.getConnection());
    const searchParams = (cov_23a63kg2me().s[3]++, request.nextUrl.searchParams);

    // Get Start_Date input from the request
    const startDate = (cov_23a63kg2me().s[4]++, searchParams.get("startDate"));

    // Get Team input from the request
    const team = (cov_23a63kg2me().s[5]++, searchParams.get("team"));
    let data;

    // Execute the query
    cov_23a63kg2me().s[6]++;
    if (startDate) {
      cov_23a63kg2me().b[0][0]++;
      const [rows] = (cov_23a63kg2me().s[7]++, await conn.query(`
          SELECT e.Staff_ID, e.Staff_FName, e.Staff_LName, e.Dept, a.Start_Date, a.Shift_Type, a.Request_Status
          FROM Employee e
          LEFT JOIN Arrangement a
          ON e.Staff_ID = a.Staff_ID and a.Request_Status = "approved" AND a.Start_Date = "${startDate}";
        `));
      cov_23a63kg2me().s[8]++;
      data = rows;
    } else {
      cov_23a63kg2me().b[0][1]++;
    }
    cov_23a63kg2me().s[9]++;
    if (team) {
      cov_23a63kg2me().b[1][0]++;
      const [rows] = (cov_23a63kg2me().s[10]++, await conn.query(`
          SELECT Employee.Staff_ID, Employee.Staff_FName, Employee.Staff_LName, Employee.Dept, 
          GROUP_CONCAT(Arrangement.Start_Date) AS Start_Date,
          GROUP_CONCAT(Arrangement.Shift_Type) AS Shift_Type
          FROM Arrangement
          RIGHT JOIN Employee ON Employee.Staff_ID = Arrangement.Staff_ID AND Arrangement.Request_Status = "Approved"
          WHERE Employee.Position = ?
          GROUP BY Employee.Staff_ID;
        `, [team]));
      cov_23a63kg2me().s[11]++;
      data = rows;
    } else {
      cov_23a63kg2me().b[1][1]++;
    }

    // Release the connection back to the pool
    cov_23a63kg2me().s[12]++;
    conn.release();

    // Return the fetched data as a JSON response
    cov_23a63kg2me().s[13]++;
    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    cov_23a63kg2me().s[14]++;
    return NextResponse.json(error, {
      status: 500
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjNhNjNrZzJtZSIsImFjdHVhbENvdmVyYWdlIiwiY29ubmVjdGlvbiIsIk5leHRSZXNwb25zZSIsIkdFVCIsInJlcXVlc3QiLCJmIiwicyIsInBvb2wiLCJjb25uIiwiZ2V0Q29ubmVjdGlvbiIsInNlYXJjaFBhcmFtcyIsIm5leHRVcmwiLCJzdGFydERhdGUiLCJnZXQiLCJ0ZWFtIiwiZGF0YSIsImIiLCJyb3dzIiwicXVlcnkiLCJyZWxlYXNlIiwianNvbiIsInN0YXR1cyIsImVycm9yIl0sInNvdXJjZXMiOlsicm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbm5lY3Rpb24gZnJvbSBcIi4uLy4uL2xpYi9kYlwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbi8vIEFQSSBFbmRwb2ludDogYXBpL3JlcXVlc3RzXG5cbi8vIEZldGNoIEFMTCBhcHByb3ZlZCByZXF1ZXN0cyBmcm9tIHRoZSBBcnJhbmdlbWVudCB0YWJsZSAtIGFuZCBhbHNvIHdobyBpcyBpbiBvZmZpY2VcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCkge1xuICB0cnkge1xuICAgIC8vIEVzdGFibGlzaCB0aGUgY29ubmVjdGlvbiB1c2luZyB0aGUgcG9vbFxuICAgIGNvbnN0IHBvb2wgPSBhd2FpdCBjb25uZWN0aW9uKCk7XG5cbiAgICAvLyBHZXQgYSBjb25uZWN0aW9uIGZyb20gdGhlIHBvb2xcbiAgICBjb25zdCBjb25uID0gYXdhaXQgcG9vbC5nZXRDb25uZWN0aW9uKCk7XG5cbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSByZXF1ZXN0Lm5leHRVcmwuc2VhcmNoUGFyYW1zO1xuXG4gICAgLy8gR2V0IFN0YXJ0X0RhdGUgaW5wdXQgZnJvbSB0aGUgcmVxdWVzdFxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHNlYXJjaFBhcmFtcy5nZXQoXCJzdGFydERhdGVcIik7XG5cbiAgICAvLyBHZXQgVGVhbSBpbnB1dCBmcm9tIHRoZSByZXF1ZXN0XG4gICAgY29uc3QgdGVhbSA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ0ZWFtXCIpO1xuXG4gICAgbGV0IGRhdGE7XG5cbiAgICAvLyBFeGVjdXRlIHRoZSBxdWVyeVxuICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgIGNvbnN0IFtyb3dzXSA9IGF3YWl0IGNvbm4ucXVlcnkoXG4gICAgICAgIGBcbiAgICAgICAgICBTRUxFQ1QgZS5TdGFmZl9JRCwgZS5TdGFmZl9GTmFtZSwgZS5TdGFmZl9MTmFtZSwgZS5EZXB0LCBhLlN0YXJ0X0RhdGUsIGEuU2hpZnRfVHlwZSwgYS5SZXF1ZXN0X1N0YXR1c1xuICAgICAgICAgIEZST00gRW1wbG95ZWUgZVxuICAgICAgICAgIExFRlQgSk9JTiBBcnJhbmdlbWVudCBhXG4gICAgICAgICAgT04gZS5TdGFmZl9JRCA9IGEuU3RhZmZfSUQgYW5kIGEuUmVxdWVzdF9TdGF0dXMgPSBcImFwcHJvdmVkXCIgQU5EIGEuU3RhcnRfRGF0ZSA9IFwiJHtzdGFydERhdGV9XCI7XG4gICAgICAgIGAsXG4gICAgICApO1xuICAgICAgZGF0YSA9IHJvd3M7XG4gICAgfVxuXG4gICAgaWYgKHRlYW0pIHtcbiAgICAgIGNvbnN0IFtyb3dzXSA9IGF3YWl0IGNvbm4ucXVlcnkoXG4gICAgICAgIGBcbiAgICAgICAgICBTRUxFQ1QgRW1wbG95ZWUuU3RhZmZfSUQsIEVtcGxveWVlLlN0YWZmX0ZOYW1lLCBFbXBsb3llZS5TdGFmZl9MTmFtZSwgRW1wbG95ZWUuRGVwdCwgXG4gICAgICAgICAgR1JPVVBfQ09OQ0FUKEFycmFuZ2VtZW50LlN0YXJ0X0RhdGUpIEFTIFN0YXJ0X0RhdGUsXG4gICAgICAgICAgR1JPVVBfQ09OQ0FUKEFycmFuZ2VtZW50LlNoaWZ0X1R5cGUpIEFTIFNoaWZ0X1R5cGVcbiAgICAgICAgICBGUk9NIEFycmFuZ2VtZW50XG4gICAgICAgICAgUklHSFQgSk9JTiBFbXBsb3llZSBPTiBFbXBsb3llZS5TdGFmZl9JRCA9IEFycmFuZ2VtZW50LlN0YWZmX0lEIEFORCBBcnJhbmdlbWVudC5SZXF1ZXN0X1N0YXR1cyA9IFwiQXBwcm92ZWRcIlxuICAgICAgICAgIFdIRVJFIEVtcGxveWVlLlBvc2l0aW9uID0gP1xuICAgICAgICAgIEdST1VQIEJZIEVtcGxveWVlLlN0YWZmX0lEO1xuICAgICAgICBgLFxuICAgICAgICBbdGVhbV0sXG4gICAgICApO1xuICAgICAgZGF0YSA9IHJvd3M7XG4gICAgfVxuXG4gICAgLy8gUmVsZWFzZSB0aGUgY29ubmVjdGlvbiBiYWNrIHRvIHRoZSBwb29sXG4gICAgY29ubi5yZWxlYXNlKCk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGZldGNoZWQgZGF0YSBhcyBhIEpTT04gcmVzcG9uc2VcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZXJyb3IsIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPRSxVQUFVLE1BQU0sY0FBYztBQUNyQyxTQUFTQyxZQUFZLFFBQVEsYUFBYTs7QUFFMUM7O0FBRUE7QUFDQSxPQUFPLGVBQWVDLEdBQUdBLENBQUNDLE9BQU8sRUFBRTtFQUFBTCxjQUFBLEdBQUFNLENBQUE7RUFBQU4sY0FBQSxHQUFBTyxDQUFBO0VBQ2pDLElBQUk7SUFDRjtJQUNBLE1BQU1DLElBQUksSUFBQVIsY0FBQSxHQUFBTyxDQUFBLE9BQUcsTUFBTUwsVUFBVSxDQUFDLENBQUM7O0lBRS9CO0lBQ0EsTUFBTU8sSUFBSSxJQUFBVCxjQUFBLEdBQUFPLENBQUEsT0FBRyxNQUFNQyxJQUFJLENBQUNFLGFBQWEsQ0FBQyxDQUFDO0lBRXZDLE1BQU1DLFlBQVksSUFBQVgsY0FBQSxHQUFBTyxDQUFBLE9BQUdGLE9BQU8sQ0FBQ08sT0FBTyxDQUFDRCxZQUFZOztJQUVqRDtJQUNBLE1BQU1FLFNBQVMsSUFBQWIsY0FBQSxHQUFBTyxDQUFBLE9BQUdJLFlBQVksQ0FBQ0csR0FBRyxDQUFDLFdBQVcsQ0FBQzs7SUFFL0M7SUFDQSxNQUFNQyxJQUFJLElBQUFmLGNBQUEsR0FBQU8sQ0FBQSxPQUFHSSxZQUFZLENBQUNHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFFckMsSUFBSUUsSUFBSTs7SUFFUjtJQUFBaEIsY0FBQSxHQUFBTyxDQUFBO0lBQ0EsSUFBSU0sU0FBUyxFQUFFO01BQUFiLGNBQUEsR0FBQWlCLENBQUE7TUFDYixNQUFNLENBQUNDLElBQUksQ0FBQyxJQUFBbEIsY0FBQSxHQUFBTyxDQUFBLE9BQUcsTUFBTUUsSUFBSSxDQUFDVSxLQUFLLENBQzdCO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsNkZBQTZGTixTQUFTO0FBQ3RHLFNBQ00sQ0FBQztNQUFDYixjQUFBLEdBQUFPLENBQUE7TUFDRlMsSUFBSSxHQUFHRSxJQUFJO0lBQ2IsQ0FBQztNQUFBbEIsY0FBQSxHQUFBaUIsQ0FBQTtJQUFBO0lBQUFqQixjQUFBLEdBQUFPLENBQUE7SUFFRCxJQUFJUSxJQUFJLEVBQUU7TUFBQWYsY0FBQSxHQUFBaUIsQ0FBQTtNQUNSLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUFsQixjQUFBLEdBQUFPLENBQUEsUUFBRyxNQUFNRSxJQUFJLENBQUNVLEtBQUssQ0FDN0I7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsRUFDRCxDQUFDSixJQUFJLENBQ1AsQ0FBQztNQUFDZixjQUFBLEdBQUFPLENBQUE7TUFDRlMsSUFBSSxHQUFHRSxJQUFJO0lBQ2IsQ0FBQztNQUFBbEIsY0FBQSxHQUFBaUIsQ0FBQTtJQUFBOztJQUVEO0lBQUFqQixjQUFBLEdBQUFPLENBQUE7SUFDQUUsSUFBSSxDQUFDVyxPQUFPLENBQUMsQ0FBQzs7SUFFZDtJQUFBcEIsY0FBQSxHQUFBTyxDQUFBO0lBQ0EsT0FBT0osWUFBWSxDQUFDa0IsSUFBSSxDQUFDTCxJQUFJLEVBQUU7TUFBRU0sTUFBTSxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQ2pELENBQUMsQ0FBQyxPQUFPQyxLQUFLLEVBQUU7SUFBQXZCLGNBQUEsR0FBQU8sQ0FBQTtJQUNkLE9BQU9KLFlBQVksQ0FBQ2tCLElBQUksQ0FBQ0UsS0FBSyxFQUFFO01BQUVELE1BQU0sRUFBRTtJQUFJLENBQUMsQ0FBQztFQUNsRDtBQUNGIiwiaWdub3JlTGlzdCI6W119