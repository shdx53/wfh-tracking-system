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
      cy.contains('button[type="submit"]', 'Continue').click({ multiple: true });
    });

    // Step 3: Navigate to team schedules page
    cy.get("nav").should("contain", "All-In-One");
    cy.get("nav").contains("Schedule").click();
    cy.get("nav").contains("Team").click();
  });

  it("should view own team member's historical and future schedules", () => {
    // Step 4: Get current dates and the relevant dates from intervals for verification
    const today = new Date();

    // Helper function to get a new date by adding/subtracting days
    const getAdjustedDate = (days) => {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + days);
      return newDate;
    };

    // Calculate dates: 5 days before, and 5 days later
    const dates = {
      todayDay: today.getDate(),
      fiveDaysBefore: getAdjustedDate(-5).getDate(),
      fiveDaysLater: getAdjustedDate(5).getDate(),
    };

    const { todayDay, fiveDaysBefore, fiveDaysLater } = dates;

    cy.log(todayDay);
    cy.log(fiveDaysBefore);
    cy.log(fiveDaysLater);

    // Scenario 1: If all dates are in the current month
    if (fiveDaysBefore < todayDay && todayDay < fiveDaysLater) {
      // a) Check 5 days before first
      cy.get('button[name="day"]').contains(fiveDaysBefore).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').contains("John Lim");

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // b) Check 5 days later
      cy.get('button[name="day"]').contains(fiveDaysLater).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });
    }

    // Scenario 2: If 5 days later are in current month, but 5 days before in previous month
    if (fiveDaysBefore > todayDay) {
      // a) Check 5 days later first
      cy.get('button[name="day"]').contains(fiveDaysLater).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
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
      cy.get('button[name="day"]').contains(fiveDaysBefore).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .last()
        .within(() => {
          cy.contains("Jaclyn Lee").should("be.visible");
          cy.contains("Sales Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });
    }

    // Scenario 3: If 5 days later are in next month, but 5 days before in current month
    if (fiveDaysLater < todayDay) {
      // a) Check 5 days before first
      cy.get('button[name="day"]').contains(fiveDaysBefore).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("AM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-blue-100/40 border-blue-700 false"]',
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
      cy.get('button[name="day"]').contains(fiveDaysLater).click();
      cy.get('[role="tablist"]').contains("Work-From-Home").click();

      // Verify number of records under the tab
      cy.get('[role="tabpanel"]').should("have.length", 3);

      // Verify the content of the first record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
      )
        .first()
        .within(() => {
          cy.contains("Bui Nguyen").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the second record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
      )
        .eq(1)
        .within(() => {
          cy.contains("Dewi Putri").should("be.visible");
          cy.contains("Account Manager").should("be.visible");
          cy.contains("PM").should("be.visible");
        });

      // Verify the content of the third record
      cy.get(
        '[class="flex justify-between rounded-lg border-l-[10px] p-6 bg-indigo-100/40 border-indigo-700 false"]',
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


// Test Case 3.2:
describe("Filter by 'In Office' and 'WFH'", () => {
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
      cy.contains('button[type="submit"]', 'Continue').click({ multiple: true });
    });

    // Step 3: Navigate to team schedules page
    cy.get("nav").should("contain", "All-In-One");
    cy.get("nav").contains("Schedule").click();
    cy.get("nav").contains("Team").click();
  });

  it("should filter team members' schedules by 'In Office' and 'WFH'", () => {
    cy.get('[role="tablist"]').contains("Work-From-Home").click();
    cy.get('[role="tablist"]').contains("In-Office").click();

    // Verify there's a list under tabs
    cy.get('[role="tabpanel"]').should("exist");
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
