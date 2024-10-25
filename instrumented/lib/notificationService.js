function cov_17ksl7lq5m() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/notificationService.js";
  var hash = "d695967de4429f19a412101b119769972d221a87";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/lib/notificationService.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 0
        },
        end: {
          line: 4,
          column: 16
        }
      },
      "1": {
        start: {
          line: 7,
          column: 18
        },
        end: {
          line: 14,
          column: 2
        }
      },
      "2": {
        start: {
          line: 18,
          column: 2
        },
        end: {
          line: 28,
          column: 3
        }
      },
      "3": {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 24,
          column: 7
        }
      },
      "4": {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 43
        }
      },
      "5": {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 27,
          column: 49
        }
      }
    },
    fnMap: {
      "0": {
        name: "sendNotification",
        decl: {
          start: {
            line: 17,
            column: 22
          },
          end: {
            line: 17,
            column: 38
          }
        },
        loc: {
          start: {
            line: 17,
            column: 54
          },
          end: {
            line: 29,
            column: 1
          }
        },
        line: 17
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "d695967de4429f19a412101b119769972d221a87"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_17ksl7lq5m = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_17ksl7lq5m();
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
cov_17ksl7lq5m().s[0]++;
dotenv.config();

// To send to Mailtrap Sandbox
var transporter = (cov_17ksl7lq5m().s[1]++, nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
}));
export async function sendNotification(subject, body) {
  cov_17ksl7lq5m().f[0]++;
  cov_17ksl7lq5m().s[2]++;
  try {
    cov_17ksl7lq5m().s[3]++;
    await transporter.sendMail({
      from: '"WFH Tracking System" <noreply@demomailtrap.com>',
      to: '"User" <spm.wfh.tracking.sys@gmail.com>',
      subject: subject,
      text: body
    });
    cov_17ksl7lq5m().s[4]++;
    console.log("Email sent successfully");
  } catch (error) {
    cov_17ksl7lq5m().s[5]++;
    console.error("Error sending email:", error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTdrc2w3bHE1bSIsImFjdHVhbENvdmVyYWdlIiwibm9kZW1haWxlciIsImRvdGVudiIsInMiLCJjb25maWciLCJ0cmFuc3BvcnRlciIsImNyZWF0ZVRyYW5zcG9ydCIsImhvc3QiLCJwb3J0IiwiYXV0aCIsInVzZXIiLCJwcm9jZXNzIiwiZW52IiwiTUFJTFRSQVBfVVNFUiIsInBhc3MiLCJNQUlMVFJBUF9QQVNTIiwic2VuZE5vdGlmaWNhdGlvbiIsInN1YmplY3QiLCJib2R5IiwiZiIsInNlbmRNYWlsIiwiZnJvbSIsInRvIiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciJdLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvblNlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcblxuZG90ZW52LmNvbmZpZygpO1xuXG4vLyBUbyBzZW5kIHRvIE1haWx0cmFwIFNhbmRib3hcbnZhciB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgaG9zdDogXCJsaXZlLnNtdHAubWFpbHRyYXAuaW9cIixcbiAgcG9ydDogNTg3LFxuICBhdXRoOiB7XG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTFRSQVBfVVNFUixcbiAgICBwYXNzOiBwcm9jZXNzLmVudi5NQUlMVFJBUF9QQVNTXG4gIH1cbn0pO1xuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kTm90aWZpY2F0aW9uKHN1YmplY3QsIGJvZHkpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbCh7XG4gICAgICBmcm9tOiAnXCJXRkggVHJhY2tpbmcgU3lzdGVtXCIgPG5vcmVwbHlAZGVtb21haWx0cmFwLmNvbT4nLFxuICAgICAgdG86ICdcIlVzZXJcIiA8c3BtLndmaC50cmFja2luZy5zeXNAZ21haWwuY29tPicsXG4gICAgICBzdWJqZWN0OiBzdWJqZWN0LFxuICAgICAgdGV4dDogYm9keSxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcIkVtYWlsIHNlbnQgc3VjY2Vzc2Z1bGx5XCIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZW5kaW5nIGVtYWlsOlwiLCBlcnJvcik7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLE9BQU9FLFVBQVUsTUFBTSxZQUFZO0FBQ25DLE9BQU9DLE1BQU0sTUFBTSxRQUFRO0FBQUNILGNBQUEsR0FBQUksQ0FBQTtBQUU1QkQsTUFBTSxDQUFDRSxNQUFNLENBQUMsQ0FBQzs7QUFFZjtBQUNBLElBQUlDLFdBQVcsSUFBQU4sY0FBQSxHQUFBSSxDQUFBLE9BQUdGLFVBQVUsQ0FBQ0ssZUFBZSxDQUFDO0VBQzNDQyxJQUFJLEVBQUUsdUJBQXVCO0VBQzdCQyxJQUFJLEVBQUUsR0FBRztFQUNUQyxJQUFJLEVBQUU7SUFDSkMsSUFBSSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsYUFBYTtJQUMvQkMsSUFBSSxFQUFFSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0c7RUFDcEI7QUFDRixDQUFDLENBQUM7QUFHRixPQUFPLGVBQWVDLGdCQUFnQkEsQ0FBQ0MsT0FBTyxFQUFFQyxJQUFJLEVBQUU7RUFBQW5CLGNBQUEsR0FBQW9CLENBQUE7RUFBQXBCLGNBQUEsR0FBQUksQ0FBQTtFQUNwRCxJQUFJO0lBQUFKLGNBQUEsR0FBQUksQ0FBQTtJQUNGLE1BQU1FLFdBQVcsQ0FBQ2UsUUFBUSxDQUFDO01BQ3pCQyxJQUFJLEVBQUUsa0RBQWtEO01BQ3hEQyxFQUFFLEVBQUUseUNBQXlDO01BQzdDTCxPQUFPLEVBQUVBLE9BQU87TUFDaEJNLElBQUksRUFBRUw7SUFDUixDQUFDLENBQUM7SUFBQ25CLGNBQUEsR0FBQUksQ0FBQTtJQUNIcUIsT0FBTyxDQUFDQyxHQUFHLENBQUMseUJBQXlCLENBQUM7RUFDeEMsQ0FBQyxDQUFDLE9BQU9DLEtBQUssRUFBRTtJQUFBM0IsY0FBQSxHQUFBSSxDQUFBO0lBQ2RxQixPQUFPLENBQUNFLEtBQUssQ0FBQyxzQkFBc0IsRUFBRUEsS0FBSyxDQUFDO0VBQzlDO0FBQ0YiLCJpZ25vcmVMaXN0IjpbXX0=