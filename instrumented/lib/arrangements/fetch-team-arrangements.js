function cov_16tnbr076n() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/arrangements/fetch-team-arrangements.js";
  var hash = "1e9b6a03d4dab38e84bf3c7df7361306c5b870f3";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/arrangements/fetch-team-arrangements.js",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 20,
          column: 3
        }
      },
      "1": {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 13,
          column: 6
        }
      },
      "2": {
        start: {
          line: 14,
          column: 9
        },
        end: {
          line: 20,
          column: 3
        }
      },
      "3": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 19,
          column: 6
        }
      },
      "4": {
        start: {
          line: 22,
          column: 2
        },
        end: {
          line: 24,
          column: 3
        }
      },
      "5": {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 51
        }
      },
      "6": {
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
        name: "fetchTeamArrangements",
        decl: {
          start: {
            line: 1,
            column: 22
          },
          end: {
            line: 1,
            column: 43
          }
        },
        loc: {
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 27,
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
            line: 8,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        }, {
          start: {
            line: 14,
            column: 9
          },
          end: {
            line: 20,
            column: 3
          }
        }],
        line: 8
      },
      "1": {
        loc: {
          start: {
            line: 14,
            column: 9
          },
          end: {
            line: 20,
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
            line: 20,
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
        line: 14
      },
      "2": {
        loc: {
          start: {
            line: 14,
            column: 13
          },
          end: {
            line: 14,
            column: 36
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
            column: 36
          }
        }],
        line: 14
      },
      "3": {
        loc: {
          start: {
            line: 22,
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
            line: 22,
            column: 2
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
        line: 22
      }
    },
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
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "1e9b6a03d4dab38e84bf3c7df7361306c5b870f3"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_16tnbr076n = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_16tnbr076n();
export async function fetchTeamArrangements(selectedTeam, staffID, selectedDate) {
  cov_16tnbr076n().f[0]++;
  let res;
  cov_16tnbr076n().s[0]++;
  if (selectedTeam) {
    cov_16tnbr076n().b[0][0]++;
    cov_16tnbr076n().s[1]++;
    // For HR and Senior Management
    // Fetch arrangements by team
    res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements?team=${selectedTeam}`);
  } else {
    cov_16tnbr076n().b[0][1]++;
    cov_16tnbr076n().s[2]++;
    if ((cov_16tnbr076n().b[2][0]++, staffID) && (cov_16tnbr076n().b[2][1]++, selectedDate)) {
      cov_16tnbr076n().b[1][0]++;
      cov_16tnbr076n().s[3]++;
      // For Managers and Staff
      // Fetch team arrangements by Staff_ID and Start_Date
      res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/teams?staffID=${staffID}&startDate=${selectedDate}`);
    } else {
      cov_16tnbr076n().b[1][1]++;
    }
  }
  cov_16tnbr076n().s[4]++;
  if (!res.ok) {
    cov_16tnbr076n().b[3][0]++;
    cov_16tnbr076n().s[5]++;
    throw new Error("Network response was not ok");
  } else {
    cov_16tnbr076n().b[3][1]++;
  }
  cov_16tnbr076n().s[6]++;
  return res.json();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTZ0bmJyMDc2biIsImFjdHVhbENvdmVyYWdlIiwiZmV0Y2hUZWFtQXJyYW5nZW1lbnRzIiwic2VsZWN0ZWRUZWFtIiwic3RhZmZJRCIsInNlbGVjdGVkRGF0ZSIsImYiLCJyZXMiLCJzIiwiYiIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0JBU0VfVVJMIiwib2siLCJFcnJvciIsImpzb24iXSwic291cmNlcyI6WyJmZXRjaC10ZWFtLWFycmFuZ2VtZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hUZWFtQXJyYW5nZW1lbnRzKFxuICBzZWxlY3RlZFRlYW0sXG4gIHN0YWZmSUQsXG4gIHNlbGVjdGVkRGF0ZSxcbikge1xuICBsZXQgcmVzO1xuXG4gIGlmIChzZWxlY3RlZFRlYW0pIHtcbiAgICAvLyBGb3IgSFIgYW5kIFNlbmlvciBNYW5hZ2VtZW50XG4gICAgLy8gRmV0Y2ggYXJyYW5nZW1lbnRzIGJ5IHRlYW1cbiAgICByZXMgPSBhd2FpdCBmZXRjaChcbiAgICAgIGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9hcGkvYXJyYW5nZW1lbnRzP3RlYW09JHtzZWxlY3RlZFRlYW19YCxcbiAgICApO1xuICB9IGVsc2UgaWYgKHN0YWZmSUQgJiYgc2VsZWN0ZWREYXRlKSB7XG4gICAgLy8gRm9yIE1hbmFnZXJzIGFuZCBTdGFmZlxuICAgIC8vIEZldGNoIHRlYW0gYXJyYW5nZW1lbnRzIGJ5IFN0YWZmX0lEIGFuZCBTdGFydF9EYXRlXG4gICAgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vYXBpL2FycmFuZ2VtZW50cy90ZWFtcz9zdGFmZklEPSR7c3RhZmZJRH0mc3RhcnREYXRlPSR7c2VsZWN0ZWREYXRlfWAsXG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rXCIpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5qc29uKCk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLE9BQU8sZUFBZUUscUJBQXFCQSxDQUN6Q0MsWUFBWSxFQUNaQyxPQUFPLEVBQ1BDLFlBQVksRUFDWjtFQUFBTCxjQUFBLEdBQUFNLENBQUE7RUFDQSxJQUFJQyxHQUFHO0VBQUNQLGNBQUEsR0FBQVEsQ0FBQTtFQUVSLElBQUlMLFlBQVksRUFBRTtJQUFBSCxjQUFBLEdBQUFTLENBQUE7SUFBQVQsY0FBQSxHQUFBUSxDQUFBO0lBQ2hCO0lBQ0E7SUFDQUQsR0FBRyxHQUFHLE1BQU1HLEtBQUssQ0FDZixHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0Msb0JBQW9CLDBCQUEwQlYsWUFBWSxFQUMzRSxDQUFDO0VBQ0gsQ0FBQyxNQUFNO0lBQUFILGNBQUEsR0FBQVMsQ0FBQTtJQUFBVCxjQUFBLEdBQUFRLENBQUE7SUFBQSxJQUFJLENBQUFSLGNBQUEsR0FBQVMsQ0FBQSxVQUFBTCxPQUFPLE1BQUFKLGNBQUEsR0FBQVMsQ0FBQSxVQUFJSixZQUFZLEdBQUU7TUFBQUwsY0FBQSxHQUFBUyxDQUFBO01BQUFULGNBQUEsR0FBQVEsQ0FBQTtNQUNsQztNQUNBO01BQ0FELEdBQUcsR0FBRyxNQUFNRyxLQUFLLENBQ2YsR0FBR0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLG9CQUFvQixtQ0FBbUNULE9BQU8sY0FBY0MsWUFBWSxFQUN6RyxDQUFDO0lBQ0gsQ0FBQztNQUFBTCxjQUFBLEdBQUFTLENBQUE7SUFBQTtFQUFEO0VBQUNULGNBQUEsR0FBQVEsQ0FBQTtFQUVELElBQUksQ0FBQ0QsR0FBRyxDQUFDTyxFQUFFLEVBQUU7SUFBQWQsY0FBQSxHQUFBUyxDQUFBO0lBQUFULGNBQUEsR0FBQVEsQ0FBQTtJQUNYLE1BQU0sSUFBSU8sS0FBSyxDQUFDLDZCQUE2QixDQUFDO0VBQ2hELENBQUM7SUFBQWYsY0FBQSxHQUFBUyxDQUFBO0VBQUE7RUFBQVQsY0FBQSxHQUFBUSxDQUFBO0VBRUQsT0FBT0QsR0FBRyxDQUFDUyxJQUFJLENBQUMsQ0FBQztBQUNuQiIsImlnbm9yZUxpc3QiOltdfQ==