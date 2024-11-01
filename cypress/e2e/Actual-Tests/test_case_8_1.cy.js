// Test Case 8.1:
describe("HR and Senior Management Login to WFH Tracking System", () => {
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

    // Step 2: Login as James Tan using cy.origin for third-party login
    cy.origin("https://wfhtrackingsystem.kinde.com", () => {
      // Input Staff ID
      cy.get('input[name="p_username"]').type("160075");
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

  it("should view requests and schedules", () => {
    // Ensure the page has loaded
    cy.get("body").should("be.visible");
    cy.reload();

    // Step 3: Navigate to Overall schedules page
    cy.get("nav").contains("Schedule").click();
    cy.get("nav").contains("Overall and team").click();
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
