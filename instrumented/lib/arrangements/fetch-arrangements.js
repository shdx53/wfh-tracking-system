function cov_sucuo8w3q() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/arrangements/fetch-arrangements.js";
  var hash = "c185e284131f5bfa52279154d386e366bda07005";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/arrangements/fetch-arrangements.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 14,
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
          line: 17,
          column: 2
        },
        end: {
          line: 21,
          column: 3
        }
      },
      "3": {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 20,
          column: 6
        }
      },
      "4": {
        start: {
          line: 24,
          column: 2
        },
        end: {
          line: 28,
          column: 3
        }
      },
      "5": {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 27,
          column: 6
        }
      },
      "6": {
        start: {
          line: 30,
          column: 2
        },
        end: {
          line: 32,
          column: 3
        }
      },
      "7": {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 31,
          column: 51
        }
      },
      "8": {
        start: {
          line: 34,
          column: 2
        },
        end: {
          line: 34,
          column: 20
        }
      }
    },
    fnMap: {
      "0": {
        name: "fetchArrangements",
        decl: {
          start: {
            line: 1,
            column: 22
          },
          end: {
            line: 1,
            column: 39
          }
        },
        loc: {
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 35,
            column: 1
          }
        },
        line: 6
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 14,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 14,
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
        line: 10
      },
      "1": {
        loc: {
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 21,
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
        line: 17
      },
      "2": {
        loc: {
          start: {
            line: 24,
            column: 2
          },
          end: {
            line: 28,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 24,
            column: 2
          },
          end: {
            line: 28,
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
        line: 24
      },
      "3": {
        loc: {
          start: {
            line: 24,
            column: 6
          },
          end: {
            line: 24,
            column: 30
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 24,
            column: 6
          },
          end: {
            line: 24,
            column: 19
          }
        }, {
          start: {
            line: 24,
            column: 23
          },
          end: {
            line: 24,
            column: 30
          }
        }],
        line: 24
      },
      "4": {
        loc: {
          start: {
            line: 30,
            column: 2
          },
          end: {
            line: 32,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 30,
            column: 2
          },
          end: {
            line: 32,
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
        line: 30
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
      "8": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c185e284131f5bfa52279154d386e366bda07005"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_sucuo8w3q = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_sucuo8w3q();
export async function fetchArrangements(selectedDate, arrangementID, requestStatus, staffID) {
  cov_sucuo8w3q().f[0]++;
  let res;

  // Fetch arrangements by Start_Date
  cov_sucuo8w3q().s[0]++;
  if (selectedDate) {
    cov_sucuo8w3q().b[0][0]++;
    cov_sucuo8w3q().s[1]++;
    res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements?startDate=${selectedDate}`);
  } else {
    cov_sucuo8w3q().b[0][1]++;
  }

  // Fetch pending and recurring arrangements by Arrangement_ID
  cov_sucuo8w3q().s[2]++;
  if (arrangementID) {
    cov_sucuo8w3q().b[1][0]++;
    cov_sucuo8w3q().s[3]++;
    res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/pending/recurring/${arrangementID}`);
  } else {
    cov_sucuo8w3q().b[1][1]++;
  }

  // Fetch arrangements by Request_Status and StaffID
  cov_sucuo8w3q().s[4]++;
  if ((cov_sucuo8w3q().b[3][0]++, requestStatus) && (cov_sucuo8w3q().b[3][1]++, staffID)) {
    cov_sucuo8w3q().b[2][0]++;
    cov_sucuo8w3q().s[5]++;
    res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/${requestStatus}?staffID=${staffID}`);
  } else {
    cov_sucuo8w3q().b[2][1]++;
  }
  cov_sucuo8w3q().s[6]++;
  if (!res.ok) {
    cov_sucuo8w3q().b[4][0]++;
    cov_sucuo8w3q().s[7]++;
    throw new Error("Network response was not ok");
  } else {
    cov_sucuo8w3q().b[4][1]++;
  }
  cov_sucuo8w3q().s[8]++;
  return res.json();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfc3VjdW84dzNxIiwiYWN0dWFsQ292ZXJhZ2UiLCJmZXRjaEFycmFuZ2VtZW50cyIsInNlbGVjdGVkRGF0ZSIsImFycmFuZ2VtZW50SUQiLCJyZXF1ZXN0U3RhdHVzIiwic3RhZmZJRCIsImYiLCJyZXMiLCJzIiwiYiIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0JBU0VfVVJMIiwib2siLCJFcnJvciIsImpzb24iXSwic291cmNlcyI6WyJmZXRjaC1hcnJhbmdlbWVudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQXJyYW5nZW1lbnRzKFxuICBzZWxlY3RlZERhdGUsXG4gIGFycmFuZ2VtZW50SUQsXG4gIHJlcXVlc3RTdGF0dXMsXG4gIHN0YWZmSUQsXG4pIHtcbiAgbGV0IHJlcztcblxuICAvLyBGZXRjaCBhcnJhbmdlbWVudHMgYnkgU3RhcnRfRGF0ZVxuICBpZiAoc2VsZWN0ZWREYXRlKSB7XG4gICAgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vYXBpL2FycmFuZ2VtZW50cz9zdGFydERhdGU9JHtzZWxlY3RlZERhdGV9YCxcbiAgICApO1xuICB9XG5cbiAgLy8gRmV0Y2ggcGVuZGluZyBhbmQgcmVjdXJyaW5nIGFycmFuZ2VtZW50cyBieSBBcnJhbmdlbWVudF9JRFxuICBpZiAoYXJyYW5nZW1lbnRJRCkge1xuICAgIHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L2FwaS9hcnJhbmdlbWVudHMvcGVuZGluZy9yZWN1cnJpbmcvJHthcnJhbmdlbWVudElEfWAsXG4gICAgKTtcbiAgfVxuXG4gIC8vIEZldGNoIGFycmFuZ2VtZW50cyBieSBSZXF1ZXN0X1N0YXR1cyBhbmQgU3RhZmZJRFxuICBpZiAocmVxdWVzdFN0YXR1cyAmJiBzdGFmZklEKSB7XG4gICAgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vYXBpL2FycmFuZ2VtZW50cy8ke3JlcXVlc3RTdGF0dXN9P3N0YWZmSUQ9JHtzdGFmZklEfWAsXG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rXCIpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5qc29uKCk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBTyxlQUFlRSxpQkFBaUJBLENBQ3JDQyxZQUFZLEVBQ1pDLGFBQWEsRUFDYkMsYUFBYSxFQUNiQyxPQUFPLEVBQ1A7RUFBQU4sYUFBQSxHQUFBTyxDQUFBO0VBQ0EsSUFBSUMsR0FBRzs7RUFFUDtFQUFBUixhQUFBLEdBQUFTLENBQUE7RUFDQSxJQUFJTixZQUFZLEVBQUU7SUFBQUgsYUFBQSxHQUFBVSxDQUFBO0lBQUFWLGFBQUEsR0FBQVMsQ0FBQTtJQUNoQkQsR0FBRyxHQUFHLE1BQU1HLEtBQUssQ0FDZixHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0Msb0JBQW9CLCtCQUErQlgsWUFBWSxFQUNoRixDQUFDO0VBQ0gsQ0FBQztJQUFBSCxhQUFBLEdBQUFVLENBQUE7RUFBQTs7RUFFRDtFQUFBVixhQUFBLEdBQUFTLENBQUE7RUFDQSxJQUFJTCxhQUFhLEVBQUU7SUFBQUosYUFBQSxHQUFBVSxDQUFBO0lBQUFWLGFBQUEsR0FBQVMsQ0FBQTtJQUNqQkQsR0FBRyxHQUFHLE1BQU1HLEtBQUssQ0FDZixHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0Msb0JBQW9CLHVDQUF1Q1YsYUFBYSxFQUN6RixDQUFDO0VBQ0gsQ0FBQztJQUFBSixhQUFBLEdBQUFVLENBQUE7RUFBQTs7RUFFRDtFQUFBVixhQUFBLEdBQUFTLENBQUE7RUFDQSxJQUFJLENBQUFULGFBQUEsR0FBQVUsQ0FBQSxVQUFBTCxhQUFhLE1BQUFMLGFBQUEsR0FBQVUsQ0FBQSxVQUFJSixPQUFPLEdBQUU7SUFBQU4sYUFBQSxHQUFBVSxDQUFBO0lBQUFWLGFBQUEsR0FBQVMsQ0FBQTtJQUM1QkQsR0FBRyxHQUFHLE1BQU1HLEtBQUssQ0FDZixHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0Msb0JBQW9CLHFCQUFxQlQsYUFBYSxZQUFZQyxPQUFPLEVBQzFGLENBQUM7RUFDSCxDQUFDO0lBQUFOLGFBQUEsR0FBQVUsQ0FBQTtFQUFBO0VBQUFWLGFBQUEsR0FBQVMsQ0FBQTtFQUVELElBQUksQ0FBQ0QsR0FBRyxDQUFDTyxFQUFFLEVBQUU7SUFBQWYsYUFBQSxHQUFBVSxDQUFBO0lBQUFWLGFBQUEsR0FBQVMsQ0FBQTtJQUNYLE1BQU0sSUFBSU8sS0FBSyxDQUFDLDZCQUE2QixDQUFDO0VBQ2hELENBQUM7SUFBQWhCLGFBQUEsR0FBQVUsQ0FBQTtFQUFBO0VBQUFWLGFBQUEsR0FBQVMsQ0FBQTtFQUVELE9BQU9ELEdBQUcsQ0FBQ1MsSUFBSSxDQUFDLENBQUM7QUFDbkIiLCJpZ25vcmVMaXN0IjpbXX0=