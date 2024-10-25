function cov_14p0o9ydqs() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/employees/fetch-employee-position.js";
  var hash = "4afeae2e1a3fcf84c1d571cf829009e24c8745c2";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/employees/fetch-employee-position.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 14
        },
        end: {
          line: 4,
          column: 3
        }
      },
      "1": {
        start: {
          line: 6,
          column: 2
        },
        end: {
          line: 8,
          column: 3
        }
      },
      "2": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 51
        }
      },
      "3": {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 10,
          column: 20
        }
      }
    },
    fnMap: {
      "0": {
        name: "fetchEmployeePosition",
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
            line: 1,
            column: 53
          },
          end: {
            line: 11,
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
            line: 6,
            column: 2
          },
          end: {
            line: 8,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 8,
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
        line: 6
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
    hash: "4afeae2e1a3fcf84c1d571cf829009e24c8745c2"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_14p0o9ydqs = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_14p0o9ydqs();
export async function fetchEmployeePosition(staffID) {
  cov_14p0o9ydqs().f[0]++;
  const res = (cov_14p0o9ydqs().s[0]++, await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/employees?staffID=${staffID}`));
  cov_14p0o9ydqs().s[1]++;
  if (!res.ok) {
    cov_14p0o9ydqs().b[0][0]++;
    cov_14p0o9ydqs().s[2]++;
    throw new Error("Network response was not ok");
  } else {
    cov_14p0o9ydqs().b[0][1]++;
  }
  cov_14p0o9ydqs().s[3]++;
  return res.json();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTRwMG85eWRxcyIsImFjdHVhbENvdmVyYWdlIiwiZmV0Y2hFbXBsb3llZVBvc2l0aW9uIiwic3RhZmZJRCIsImYiLCJyZXMiLCJzIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQkFTRV9VUkwiLCJvayIsImIiLCJFcnJvciIsImpzb24iXSwic291cmNlcyI6WyJmZXRjaC1lbXBsb3llZS1wb3NpdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hFbXBsb3llZVBvc2l0aW9uKHN0YWZmSUQpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L2FwaS9lbXBsb3llZXM/c3RhZmZJRD0ke3N0YWZmSUR9YCxcbiAgKTtcblxuICBpZiAoIXJlcy5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBva1wiKTtcbiAgfVxuXG4gIHJldHVybiByZXMuanNvbigpO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixPQUFPLGVBQWVFLHFCQUFxQkEsQ0FBQ0MsT0FBTyxFQUFFO0VBQUFILGNBQUEsR0FBQUksQ0FBQTtFQUNuRCxNQUFNQyxHQUFHLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHLE1BQU1DLEtBQUssQ0FDckIsR0FBR0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLG9CQUFvQiwwQkFBMEJQLE9BQU8sRUFDdEUsQ0FBQztFQUFDSCxjQUFBLEdBQUFNLENBQUE7RUFFRixJQUFJLENBQUNELEdBQUcsQ0FBQ00sRUFBRSxFQUFFO0lBQUFYLGNBQUEsR0FBQVksQ0FBQTtJQUFBWixjQUFBLEdBQUFNLENBQUE7SUFDWCxNQUFNLElBQUlPLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQztFQUNoRCxDQUFDO0lBQUFiLGNBQUEsR0FBQVksQ0FBQTtFQUFBO0VBQUFaLGNBQUEsR0FBQU0sQ0FBQTtFQUVELE9BQU9ELEdBQUcsQ0FBQ1MsSUFBSSxDQUFDLENBQUM7QUFDbkIiLCJpZ25vcmVMaXN0IjpbXX0=