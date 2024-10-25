function cov_1qkyxnymm() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/db.js";
  var hash = "83c195fd33c65a1123188eb2a27db37dfb58a109";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/db.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 19
        },
        end: {
          line: 12,
          column: 1
        }
      },
      "1": {
        start: {
          line: 4,
          column: 15
        },
        end: {
          line: 9,
          column: 4
        }
      },
      "2": {
        start: {
          line: 11,
          column: 2
        },
        end: {
          line: 11,
          column: 14
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 3,
            column: 19
          },
          end: {
            line: 3,
            column: 20
          }
        },
        loc: {
          start: {
            line: 3,
            column: 31
          },
          end: {
            line: 12,
            column: 1
          }
        },
        line: 3
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "83c195fd33c65a1123188eb2a27db37dfb58a109"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1qkyxnymm = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1qkyxnymm();
import mysql from "mysql2/promise";
cov_1qkyxnymm().s[0]++;
const connection = async () => {
  cov_1qkyxnymm().f[0]++;
  const pool = (cov_1qkyxnymm().s[1]++, mysql.createPool({
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }));
  cov_1qkyxnymm().s[2]++;
  return pool;
};
export default connection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXFreXhueW1tIiwiYWN0dWFsQ292ZXJhZ2UiLCJteXNxbCIsInMiLCJjb25uZWN0aW9uIiwiZiIsInBvb2wiLCJjcmVhdGVQb29sIiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJEQl9JUCIsInVzZXIiLCJEQl9VU0VSIiwicGFzc3dvcmQiLCJEQl9QQVNTIiwiZGF0YWJhc2UiLCJEQl9OQU1FIl0sInNvdXJjZXMiOlsiZGIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG15c3FsIGZyb20gXCJteXNxbDIvcHJvbWlzZVwiO1xuXG5jb25zdCBjb25uZWN0aW9uID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwb29sID0gbXlzcWwuY3JlYXRlUG9vbCh7XG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSVAsXG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuREJfVVNFUixcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTUyxcbiAgICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuREJfTkFNRSxcbiAgfSk7XG5cbiAgcmV0dXJuIHBvb2w7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0aW9uO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBZlosT0FBT0UsS0FBSyxNQUFNLGdCQUFnQjtBQUFDRixhQUFBLEdBQUFHLENBQUE7QUFFbkMsTUFBTUMsVUFBVSxHQUFHLE1BQUFBLENBQUEsS0FBWTtFQUFBSixhQUFBLEdBQUFLLENBQUE7RUFDN0IsTUFBTUMsSUFBSSxJQUFBTixhQUFBLEdBQUFHLENBQUEsT0FBR0QsS0FBSyxDQUFDSyxVQUFVLENBQUM7SUFDNUJDLElBQUksRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLEtBQUs7SUFDdkJDLElBQUksRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLE9BQU87SUFDekJDLFFBQVEsRUFBRUwsT0FBTyxDQUFDQyxHQUFHLENBQUNLLE9BQU87SUFDN0JDLFFBQVEsRUFBRVAsT0FBTyxDQUFDQyxHQUFHLENBQUNPO0VBQ3hCLENBQUMsQ0FBQztFQUFDakIsYUFBQSxHQUFBRyxDQUFBO0VBRUgsT0FBT0csSUFBSTtBQUNiLENBQUM7QUFFRCxlQUFlRixVQUFVIiwiaWdub3JlTGlzdCI6W119