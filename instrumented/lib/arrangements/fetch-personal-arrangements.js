function cov_v7p4u23ma() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/arrangements/fetch-personal-arrangements.js";
  var hash = "dd271d833343ee8433f5c01c981d66d3b9d29596";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/arrangements/fetch-personal-arrangements.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 33
        },
        end: {
          line: 5,
          column: 41
        }
      },
      "1": {
        start: {
          line: 9,
          column: 2
        },
        end: {
          line: 24,
          column: 3
        }
      },
      "2": {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 13,
          column: 6
        }
      },
      "3": {
        start: {
          line: 14,
          column: 9
        },
        end: {
          line: 24,
          column: 3
        }
      },
      "4": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 18,
          column: 6
        }
      },
      "5": {
        start: {
          line: 19,
          column: 9
        },
        end: {
          line: 24,
          column: 3
        }
      },
      "6": {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 23,
          column: 6
        }
      },
      "7": {
        start: {
          line: 26,
          column: 2
        },
        end: {
          line: 26,
          column: 20
        }
      }
    },
    fnMap: {
      "0": {
        name: "fetchPersonalArrangements",
        decl: {
          start: {
            line: 1,
            column: 30
          },
          end: {
            line: 1,
            column: 55
          }
        },
        loc: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 27,
            column: 1
          }
        },
        line: 4
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 24,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 24,
            column: 3
          }
        }, {
          start: {
            line: 14,
            column: 9
          },
          end: {
            line: 24,
            column: 3
          }
        }],
        line: 9
      },
      "1": {
        loc: {
          start: {
            line: 9,
            column: 6
          },
          end: {
            line: 9,
            column: 43
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 9,
            column: 6
          },
          end: {
            line: 9,
            column: 13
          }
        }, {
          start: {
            line: 9,
            column: 17
          },
          end: {
            line: 9,
            column: 26
          }
        }, {
          start: {
            line: 9,
            column: 30
          },
          end: {
            line: 9,
            column: 43
          }
        }],
        line: 9
      },
      "2": {
        loc: {
          start: {
            line: 14,
            column: 9
          },
          end: {
            line: 24,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 14,
            column: 9
          },
          end: {
            line: 24,
            column: 3
          }
        }, {
          start: {
            line: 19,
            column: 9
          },
          end: {
            line: 24,
            column: 3
          }
        }],
        line: 14
      },
      "3": {
        loc: {
          start: {
            line: 14,
            column: 13
          },
          end: {
            line: 14,
            column: 37
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 14,
            column: 13
          },
          end: {
            line: 14,
            column: 20
          }
        }, {
          start: {
            line: 14,
            column: 24
          },
          end: {
            line: 14,
            column: 37
          }
        }],
        line: 14
      },
      "4": {
        loc: {
          start: {
            line: 19,
            column: 9
          },
          end: {
            line: 24,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 19,
            column: 9
          },
          end: {
            line: 24,
            column: 3
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
        line: 19
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
      "7": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "dd271d833343ee8433f5c01c981d66d3b9d29596"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_v7p4u23ma = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_v7p4u23ma();
export default async function fetchPersonalArrangements(queryKey, requestStatus) {
  cov_v7p4u23ma().f[0]++;
  const {
    staffID,
    startDate
  } = (cov_v7p4u23ma().s[0]++, queryKey);
  let res;
  cov_v7p4u23ma().s[1]++;
  if ((cov_v7p4u23ma().b[1][0]++, staffID) && (cov_v7p4u23ma().b[1][1]++, startDate) && (cov_v7p4u23ma().b[1][2]++, requestStatus)) {
    cov_v7p4u23ma().b[0][0]++;
    cov_v7p4u23ma().s[2]++;
    // Fetch personal arrangements by Staff_ID, Start_Date, and Request_sTATUS
    res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal/${requestStatus}?staffID=${staffID}&startDate=${startDate}`);
  } else {
    cov_v7p4u23ma().b[0][1]++;
    cov_v7p4u23ma().s[3]++;
    if ((cov_v7p4u23ma().b[3][0]++, staffID) && (cov_v7p4u23ma().b[3][1]++, requestStatus)) {
      cov_v7p4u23ma().b[2][0]++;
      cov_v7p4u23ma().s[4]++;
      // Fetch personal arrangements by Staff_ID and Request_Status
      res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal/${requestStatus}?staffID=${staffID}`);
    } else {
      cov_v7p4u23ma().b[2][1]++;
      cov_v7p4u23ma().s[5]++;
      if (staffID) {
        cov_v7p4u23ma().b[4][0]++;
        cov_v7p4u23ma().s[6]++;
        // Fetch personal arrangements by Staff_ID
        res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal?staffID=${staffID}`);
      } else {
        cov_v7p4u23ma().b[4][1]++;
      }
    }
  }
  cov_v7p4u23ma().s[7]++;
  return res.json();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfdjdwNHUyM21hIiwiYWN0dWFsQ292ZXJhZ2UiLCJmZXRjaFBlcnNvbmFsQXJyYW5nZW1lbnRzIiwicXVlcnlLZXkiLCJyZXF1ZXN0U3RhdHVzIiwiZiIsInN0YWZmSUQiLCJzdGFydERhdGUiLCJzIiwicmVzIiwiYiIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0JBU0VfVVJMIiwianNvbiJdLCJzb3VyY2VzIjpbImZldGNoLXBlcnNvbmFsLWFycmFuZ2VtZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBmZXRjaFBlcnNvbmFsQXJyYW5nZW1lbnRzKFxuICBxdWVyeUtleSxcbiAgcmVxdWVzdFN0YXR1cyxcbikge1xuICBjb25zdCB7IHN0YWZmSUQsIHN0YXJ0RGF0ZSB9ID0gcXVlcnlLZXk7XG5cbiAgbGV0IHJlcztcblxuICBpZiAoc3RhZmZJRCAmJiBzdGFydERhdGUgJiYgcmVxdWVzdFN0YXR1cykge1xuICAgIC8vIEZldGNoIHBlcnNvbmFsIGFycmFuZ2VtZW50cyBieSBTdGFmZl9JRCwgU3RhcnRfRGF0ZSwgYW5kIFJlcXVlc3Rfc1RBVFVTXG4gICAgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vYXBpL2FycmFuZ2VtZW50cy9wZXJzb25hbC8ke3JlcXVlc3RTdGF0dXN9P3N0YWZmSUQ9JHtzdGFmZklEfSZzdGFydERhdGU9JHtzdGFydERhdGV9YCxcbiAgICApO1xuICB9IGVsc2UgaWYgKHN0YWZmSUQgJiYgcmVxdWVzdFN0YXR1cykge1xuICAgIC8vIEZldGNoIHBlcnNvbmFsIGFycmFuZ2VtZW50cyBieSBTdGFmZl9JRCBhbmQgUmVxdWVzdF9TdGF0dXNcbiAgICByZXMgPSBhd2FpdCBmZXRjaChcbiAgICAgIGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hcGkvYXJyYW5nZW1lbnRzL3BlcnNvbmFsLyR7cmVxdWVzdFN0YXR1c30/c3RhZmZJRD0ke3N0YWZmSUR9YCxcbiAgICApO1xuICB9IGVsc2UgaWYgKHN0YWZmSUQpIHtcbiAgICAvLyBGZXRjaCBwZXJzb25hbCBhcnJhbmdlbWVudHMgYnkgU3RhZmZfSURcbiAgICByZXMgPSBhd2FpdCBmZXRjaChcbiAgICAgIGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hcGkvYXJyYW5nZW1lbnRzL3BlcnNvbmFsP3N0YWZmSUQ9JHtzdGFmZklEfWAsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiByZXMuanNvbigpO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixlQUFlLGVBQWVFLHlCQUF5QkEsQ0FDckRDLFFBQVEsRUFDUkMsYUFBYSxFQUNiO0VBQUFKLGFBQUEsR0FBQUssQ0FBQTtFQUNBLE1BQU07SUFBRUMsT0FBTztJQUFFQztFQUFVLENBQUMsSUFBQVAsYUFBQSxHQUFBUSxDQUFBLE9BQUdMLFFBQVE7RUFFdkMsSUFBSU0sR0FBRztFQUFDVCxhQUFBLEdBQUFRLENBQUE7RUFFUixJQUFJLENBQUFSLGFBQUEsR0FBQVUsQ0FBQSxVQUFBSixPQUFPLE1BQUFOLGFBQUEsR0FBQVUsQ0FBQSxVQUFJSCxTQUFTLE1BQUFQLGFBQUEsR0FBQVUsQ0FBQSxVQUFJTixhQUFhLEdBQUU7SUFBQUosYUFBQSxHQUFBVSxDQUFBO0lBQUFWLGFBQUEsR0FBQVEsQ0FBQTtJQUN6QztJQUNBQyxHQUFHLEdBQUcsTUFBTUUsS0FBSyxDQUNmLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxvQkFBb0IsOEJBQThCVixhQUFhLFlBQVlFLE9BQU8sY0FBY0MsU0FBUyxFQUMxSCxDQUFDO0VBQ0gsQ0FBQyxNQUFNO0lBQUFQLGFBQUEsR0FBQVUsQ0FBQTtJQUFBVixhQUFBLEdBQUFRLENBQUE7SUFBQSxJQUFJLENBQUFSLGFBQUEsR0FBQVUsQ0FBQSxVQUFBSixPQUFPLE1BQUFOLGFBQUEsR0FBQVUsQ0FBQSxVQUFJTixhQUFhLEdBQUU7TUFBQUosYUFBQSxHQUFBVSxDQUFBO01BQUFWLGFBQUEsR0FBQVEsQ0FBQTtNQUNuQztNQUNBQyxHQUFHLEdBQUcsTUFBTUUsS0FBSyxDQUNmLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxvQkFBb0IsOEJBQThCVixhQUFhLFlBQVlFLE9BQU8sRUFDbkcsQ0FBQztJQUNILENBQUMsTUFBTTtNQUFBTixhQUFBLEdBQUFVLENBQUE7TUFBQVYsYUFBQSxHQUFBUSxDQUFBO01BQUEsSUFBSUYsT0FBTyxFQUFFO1FBQUFOLGFBQUEsR0FBQVUsQ0FBQTtRQUFBVixhQUFBLEdBQUFRLENBQUE7UUFDbEI7UUFDQUMsR0FBRyxHQUFHLE1BQU1FLEtBQUssQ0FDZixHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0Msb0JBQW9CLHNDQUFzQ1IsT0FBTyxFQUNsRixDQUFDO01BQ0gsQ0FBQztRQUFBTixhQUFBLEdBQUFVLENBQUE7TUFBQTtJQUFEO0VBQUE7RUFBQ1YsYUFBQSxHQUFBUSxDQUFBO0VBRUQsT0FBT0MsR0FBRyxDQUFDTSxJQUFJLENBQUMsQ0FBQztBQUNuQiIsImlnbm9yZUxpc3QiOltdfQ==