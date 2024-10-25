function cov_dak2f91y2() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/schedules/overall/fetch-teams.js";
  var hash = "707673d110b5ca33cc2e233fd4db9ae1f3da6d91";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/schedules/overall/fetch-teams.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 14
        },
        end: {
          line: 2,
          column: 74
        }
      },
      "1": {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 6,
          column: 3
        }
      },
      "2": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 51
        }
      },
      "3": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 8,
          column: 20
        }
      }
    },
    fnMap: {
      "0": {
        name: "fetchTeams",
        decl: {
          start: {
            line: 1,
            column: 22
          },
          end: {
            line: 1,
            column: 32
          }
        },
        loc: {
          start: {
            line: 1,
            column: 35
          },
          end: {
            line: 9,
            column: 1
          }
        },
        line: 1
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 6,
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
        line: 4
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "707673d110b5ca33cc2e233fd4db9ae1f3da6d91"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_dak2f91y2 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_dak2f91y2();
export async function fetchTeams() {
  cov_dak2f91y2().f[0]++;
  const res = (cov_dak2f91y2().s[0]++, await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`));
  cov_dak2f91y2().s[1]++;
  if (!res.ok) {
    cov_dak2f91y2().b[0][0]++;
    cov_dak2f91y2().s[2]++;
    throw new Error("Network response was not ok");
  } else {
    cov_dak2f91y2().b[0][1]++;
  }
  cov_dak2f91y2().s[3]++;
  return res.json();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfZGFrMmY5MXkyIiwiYWN0dWFsQ292ZXJhZ2UiLCJmZXRjaFRlYW1zIiwiZiIsInJlcyIsInMiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19CQVNFX1VSTCIsIm9rIiwiYiIsIkVycm9yIiwianNvbiJdLCJzb3VyY2VzIjpbImZldGNoLXRlYW1zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRlYW1zKCkge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vYXBpL3RlYW1zYCk7XG5cbiAgaWYgKCFyZXMub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZXR3b3JrIHJlc3BvbnNlIHdhcyBub3Qgb2tcIik7XG4gIH1cblxuICByZXR1cm4gcmVzLmpzb24oKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBTyxlQUFlRSxVQUFVQSxDQUFBLEVBQUc7RUFBQUYsYUFBQSxHQUFBRyxDQUFBO0VBQ2pDLE1BQU1DLEdBQUcsSUFBQUosYUFBQSxHQUFBSyxDQUFBLE9BQUcsTUFBTUMsS0FBSyxDQUFDLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxvQkFBb0IsWUFBWSxDQUFDO0VBQUNULGFBQUEsR0FBQUssQ0FBQTtFQUV6RSxJQUFJLENBQUNELEdBQUcsQ0FBQ00sRUFBRSxFQUFFO0lBQUFWLGFBQUEsR0FBQVcsQ0FBQTtJQUFBWCxhQUFBLEdBQUFLLENBQUE7SUFDWCxNQUFNLElBQUlPLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQztFQUNoRCxDQUFDO0lBQUFaLGFBQUEsR0FBQVcsQ0FBQTtFQUFBO0VBQUFYLGFBQUEsR0FBQUssQ0FBQTtFQUVELE9BQU9ELEdBQUcsQ0FBQ1MsSUFBSSxDQUFDLENBQUM7QUFDbkIiLCJpZ25vcmVMaXN0IjpbXX0=