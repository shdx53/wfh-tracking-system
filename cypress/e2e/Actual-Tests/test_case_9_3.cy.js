// Test Case 9.3:
describe("Manager/Director Filter WFH Requests by Staff Name & Date", () => {
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

    // Step 2: Login as Philip Lee using cy.origin for third-party login
    cy.origin("https://wfhtrackingsystem.kinde.com", () => {
      // Input Staff ID
      cy.get('input[name="p_username"]').type("151408");
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

  it("should filter out WFH Requests by Staff Name and Date", () => {
    // Ensure the page has loaded
    cy.get("body").should("be.visible");
    cy.reload();

    // Step 3: Navigate to Requests page
    cy.get("nav", { timeout: 10000 }).should("contain", "All-In-One");
    cy.get("nav", { timeout: 10000 }).contains("Arrangement").click();
    cy.get("nav", { timeout: 10000 }).contains("All requests").click();

    // Step 4: Fill up Name Input
    cy.get('input[placeholder="Employee"]').type("John Lim");

    // Step 5: Fill up Date Filter Input
    function addDaysToCurrentDate(days) {
      const currentDate = new Date();
      currentDate.setUTCDate(currentDate.getUTCDate() + days);

      const year = currentDate.getUTCFullYear();
      const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getUTCDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
    let dateLater = addDaysToCurrentDate(2);
    cy.get('input[placeholder="Start date (YYYY-MM-DD)"]').type(dateLater);

    // Step 6: A list of results after filtering should exist
    cy.wait(2000);
    cy.get('svg[class="lucide lucide-search cursor-pointer"]').click({
      multiple: true,
    });
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
