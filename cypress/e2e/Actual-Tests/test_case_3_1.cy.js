// Test Case 3.1:
describe("View Team's Schedule for Manager/Director", () => {
  // Use before to run setup code before the tests
  before(() => {
    // Step 1: Visit the homepage and log in once
    cy.visit("https://wfh-tracking-system.vercel.app/");

    // Ensure the page has loaded
    cy.get("body").should("be.visible");

    // Verify the 'Nav Bar' is visible
    cy.get("nav").should("contain", "All-In-One");

    // Navigate to the login page
    cy.get("a").click();

    // Step 2: Login as Sophia Toh using cy.origin for third-party login
    cy.origin("https://wfhtrackingsystem.kinde.com", () => {
      // Input Staff ID
      cy.get('input[name="p_username"]').type("140103");
      cy.get('button[type="submit"]').click();

      // Wait for the password input to be visible
      cy.get('input[name="p_password"]', { timeout: 10000 }).should(
        "be.visible",
      );

      cy.get('input[name="p_password"]').type("password");
      cy.contains('button[type="submit"]', "Continue").click({
        multiple: true,
      });
    });
  });

  it("should view own team member's historical and future schedules", () => {
    // Ensure the page has loaded
    cy.get("body").should("be.visible");
    cy.reload();

    // Step 3: Navigate to team schedules page
    cy.get("nav", { timeout: 10000 }).should("contain", "All-In-One");
    cy.get("nav", { timeout: 10000 }).contains("Schedule").click();
    cy.get("nav", { timeout: 10000 }).contains("Team").click();

    // Step 4: Get current dates and the relevant dates from intervals for verification
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Helper function to get a new date by adding/subtracting days
    const getAdjustedDate = (days) => {
      const adjustedDate = new Date(today);
      adjustedDate.setUTCDate(today.getUTCDate() + days);
      return adjustedDate;
    };

    // Calculate dates: 5 days before, and 5 days later
    const dates = {
      todayDate: today,
      fiveDaysBefore: getAdjustedDate(-5),
      fiveDaysLater: getAdjustedDate(5),
    };

    // Destructure the dates
    const { todayDate, fiveDaysBefore, fiveDaysLater } = dates;

    // Function to compare the month of two dates
    const isSameMonth = (date1, date2) =>
      date1.getUTCMonth() === date2.getUTCMonth();

    // Scenario 1: If all dates are in the current month

    if (
      isSameMonth(fiveDaysBefore, todayDate) &&
      isSameMonth(todayDate, fiveDaysLater)
    ) {
      // a) Check 5 days before first
      cy.get('button[name="day"]').contains(fiveDaysBefore.getDate()).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // b) Check 5 days later
      cy.get('button[name="day"]').contains(fiveDaysLater.getDate()).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });
    }

    // Scenario 2: If 5 days later are in current month, but 5 days before in previous month
    if (
      !isSameMonth(fiveDaysBefore, todayDate) &&
      isSameMonth(todayDate, fiveDaysLater)
    ) {
      // a) Check 5 days later first
      cy.get('button[name="day"]').contains(fiveDaysLater.getDate()).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // b) Go to the previous month to check 5 days before
      cy.get('button[name="previous-month"]').click({
        multiple: true,
        force: true,
      });

      // c) Check 5 days before
      cy.get('button[name="day"]').contains(fiveDaysBefore.getDate()).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });
    }

    // Scenario 3: If 5 days later are in next month, but 5 days before in current month
    if (
      isSameMonth(fiveDaysBefore, todayDate) &&
      !isSameMonth(todayDate, fiveDaysLater)
    ) {
      // a) Check 5 days before first
      cy.get('button[name="day"]').contains(fiveDaysBefore.getDate()).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]', { timeout: 10000 }
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // b) Go to the next month to check 5 days later
      cy.get('button[name="next-month"]').click({
        multiple: true,
        force: true,
      });

      // c) Check 5 days later
      cy.get('button[name="day"]').contains(fiveDaysLater.getDate()).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]', { timeout: 10000 }
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });
    }
  });

  // Clear sessions after each test
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });
});
