function cov_10z362zvfl() {
  var path = "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/schemas/arrangement/new/new-arrangement-schema.js";
  var hash = "ceb5c709c65f07224ad1d13057f0f67412401359";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ongsweelong/Library/CloudStorage/OneDrive-SingaporeManagementUniversity/Y3S1/SPM IS212/Project/wfh-tracking-system/app/schemas/arrangement/new/new-arrangement-schema.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 19
        },
        end: {
          line: 29,
          column: 2
        }
      },
      "1": {
        start: {
          line: 8,
          column: 23
        },
        end: {
          line: 8,
          column: 37
        }
      },
      "2": {
        start: {
          line: 14,
          column: 23
        },
        end: {
          line: 14,
          column: 37
        }
      },
      "3": {
        start: {
          line: 20,
          column: 23
        },
        end: {
          line: 20,
          column: 37
        }
      },
      "4": {
        start: {
          line: 32,
          column: 25
        },
        end: {
          line: 49,
          column: 1
        }
      },
      "5": {
        start: {
          line: 33,
          column: 2
        },
        end: {
          line: 47,
          column: 3
        }
      },
      "6": {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 46,
          column: 7
        }
      },
      "7": {
        start: {
          line: 38,
          column: 27
        },
        end: {
          line: 38,
          column: 41
        }
      },
      "8": {
        start: {
          line: 48,
          column: 2
        },
        end: {
          line: 48,
          column: 20
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 12
          },
          end: {
            line: 8,
            column: 13
          }
        },
        loc: {
          start: {
            line: 8,
            column: 23
          },
          end: {
            line: 8,
            column: 37
          }
        },
        line: 8
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 14,
            column: 12
          },
          end: {
            line: 14,
            column: 13
          }
        },
        loc: {
          start: {
            line: 14,
            column: 23
          },
          end: {
            line: 14,
            column: 37
          }
        },
        line: 14
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 20,
            column: 12
          },
          end: {
            line: 20,
            column: 13
          }
        },
        loc: {
          start: {
            line: 20,
            column: 23
          },
          end: {
            line: 20,
            column: 37
          }
        },
        line: 20
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 32,
            column: 25
          },
          end: {
            line: 32,
            column: 26
          }
        },
        loc: {
          start: {
            line: 32,
            column: 42
          },
          end: {
            line: 49,
            column: 1
          }
        },
        line: 32
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 38,
            column: 16
          },
          end: {
            line: 38,
            column: 17
          }
        },
        loc: {
          start: {
            line: 38,
            column: 27
          },
          end: {
            line: 38,
            column: 41
          }
        },
        line: 38
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 33,
            column: 2
          },
          end: {
            line: 47,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 33,
            column: 2
          },
          end: {
            line: 47,
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
        line: 33
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
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "ceb5c709c65f07224ad1d13057f0f67412401359"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_10z362zvfl = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_10z362zvfl();
import { z } from "zod";

// Base schema
const baseSchema = (cov_10z362zvfl().s[0]++, z.object({
  arrangementType: z.enum(["Ad-hoc", "Recurring"]).nullable().refine(value => {
    cov_10z362zvfl().f[0]++;
    cov_10z362zvfl().s[1]++;
    return value !== null;
  }, {
    message: "Required"
  }),
  startDate: z.date({}).nullable().refine(value => {
    cov_10z362zvfl().f[1]++;
    cov_10z362zvfl().s[2]++;
    return value !== null;
  }, {
    message: "Required"
  }),
  shiftType: z.enum(["AM", "PM", "Full Day"]).nullable().refine(value => {
    cov_10z362zvfl().f[2]++;
    cov_10z362zvfl().s[3]++;
    return value !== null;
  }, {
    message: "Required"
  }),
  applyReason: z.string().max(50, {
    message: "Reason must be 50 characters or fewer"
  }).optional()
}));

// Function to get the full schema based on arrangement type
cov_10z362zvfl().s[4]++;
export const getSchema = isRecurring => {
  cov_10z362zvfl().f[3]++;
  cov_10z362zvfl().s[5]++;
  if (isRecurring) {
    cov_10z362zvfl().b[0][0]++;
    cov_10z362zvfl().s[6]++;
    return baseSchema.extend({
      endDate: z.date({}).nullable().refine(value => {
        cov_10z362zvfl().f[4]++;
        cov_10z362zvfl().s[7]++;
        return value !== null;
      }, {
        message: "Required"
      }),
      recurringInterval: z.enum(["Weekly", "Monthly"], {
        required_error: "Required"
      }).nullable()
    });
  } else {
    cov_10z362zvfl().b[0][1]++;
  }
  cov_10z362zvfl().s[8]++;
  return baseSchema;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTB6MzYyenZmbCIsImFjdHVhbENvdmVyYWdlIiwieiIsImJhc2VTY2hlbWEiLCJzIiwib2JqZWN0IiwiYXJyYW5nZW1lbnRUeXBlIiwiZW51bSIsIm51bGxhYmxlIiwicmVmaW5lIiwidmFsdWUiLCJmIiwibWVzc2FnZSIsInN0YXJ0RGF0ZSIsImRhdGUiLCJzaGlmdFR5cGUiLCJhcHBseVJlYXNvbiIsInN0cmluZyIsIm1heCIsIm9wdGlvbmFsIiwiZ2V0U2NoZW1hIiwiaXNSZWN1cnJpbmciLCJiIiwiZXh0ZW5kIiwiZW5kRGF0ZSIsInJlY3VycmluZ0ludGVydmFsIiwicmVxdWlyZWRfZXJyb3IiXSwic291cmNlcyI6WyJuZXctYXJyYW5nZW1lbnQtc2NoZW1hLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbi8vIEJhc2Ugc2NoZW1hXG5jb25zdCBiYXNlU2NoZW1hID0gei5vYmplY3Qoe1xuICBhcnJhbmdlbWVudFR5cGU6IHpcbiAgICAuZW51bShbXCJBZC1ob2NcIiwgXCJSZWN1cnJpbmdcIl0pXG4gICAgLm51bGxhYmxlKClcbiAgICAucmVmaW5lKCh2YWx1ZSkgPT4gdmFsdWUgIT09IG51bGwsIHtcbiAgICAgIG1lc3NhZ2U6IFwiUmVxdWlyZWRcIixcbiAgICB9KSxcbiAgc3RhcnREYXRlOiB6XG4gICAgLmRhdGUoe30pXG4gICAgLm51bGxhYmxlKClcbiAgICAucmVmaW5lKCh2YWx1ZSkgPT4gdmFsdWUgIT09IG51bGwsIHtcbiAgICAgIG1lc3NhZ2U6IFwiUmVxdWlyZWRcIixcbiAgICB9KSxcbiAgc2hpZnRUeXBlOiB6XG4gICAgLmVudW0oW1wiQU1cIiwgXCJQTVwiLCBcIkZ1bGwgRGF5XCJdKVxuICAgIC5udWxsYWJsZSgpXG4gICAgLnJlZmluZSgodmFsdWUpID0+IHZhbHVlICE9PSBudWxsLCB7XG4gICAgICBtZXNzYWdlOiBcIlJlcXVpcmVkXCIsXG4gICAgfSksXG4gIGFwcGx5UmVhc29uOiB6XG4gICAgLnN0cmluZygpXG4gICAgLm1heCg1MCwge1xuICAgICAgbWVzc2FnZTogXCJSZWFzb24gbXVzdCBiZSA1MCBjaGFyYWN0ZXJzIG9yIGZld2VyXCIsXG4gICAgfSlcbiAgICAub3B0aW9uYWwoKSxcbn0pO1xuXG4vLyBGdW5jdGlvbiB0byBnZXQgdGhlIGZ1bGwgc2NoZW1hIGJhc2VkIG9uIGFycmFuZ2VtZW50IHR5cGVcbmV4cG9ydCBjb25zdCBnZXRTY2hlbWEgPSAoaXNSZWN1cnJpbmcpID0+IHtcbiAgaWYgKGlzUmVjdXJyaW5nKSB7XG4gICAgcmV0dXJuIGJhc2VTY2hlbWEuZXh0ZW5kKHtcbiAgICAgIGVuZERhdGU6IHpcbiAgICAgICAgLmRhdGUoe30pXG4gICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgIC5yZWZpbmUoKHZhbHVlKSA9PiB2YWx1ZSAhPT0gbnVsbCwge1xuICAgICAgICAgIG1lc3NhZ2U6IFwiUmVxdWlyZWRcIixcbiAgICAgICAgfSksXG4gICAgICByZWN1cnJpbmdJbnRlcnZhbDogelxuICAgICAgICAuZW51bShbXCJXZWVrbHlcIiwgXCJNb250aGx5XCJdLCB7XG4gICAgICAgICAgcmVxdWlyZWRfZXJyb3I6IFwiUmVxdWlyZWRcIixcbiAgICAgICAgfSlcbiAgICAgICAgLm51bGxhYmxlKCksXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGJhc2VTY2hlbWE7XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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