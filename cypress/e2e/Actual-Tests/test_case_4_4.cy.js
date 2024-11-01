// Test Case 4.4:
describe("Responsive Design Validation for Schedule View", () => {
  // Use before to run setup code before the tests
  beforeEach(() => {
    // Step 1: Visit the homepage and log in once
    cy.visit("https://wfh-tracking-system.vercel.app/");

    // Ensure the page has loaded
    cy.get("body").should("be.visible");

    // Verify the 'Nav Bar' is visible
    cy.get("nav").should("contain", "All-In-One");

    // Navigate to the login page
    cy.get("a").click();

    // Step 2: Login as Derek Tan using cy.origin for third-party login
    cy.origin("https://wfhtrackingsystem.kinde.com", () => {
      // Input Staff ID
      cy.get('input[name="p_username"]').type("140001");
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

  it("should adjust to mobile viewport (375px)", () => {
    cy.viewport(375, 667); // Set viewport to 375px width and 667px height

    cy.get("nav").should("contain", "All-In-One");
  });

  it("should adjust to tablet viewport (768px)", () => {
    cy.viewport(768, 1024); // Set viewport to 768px width and 1024px height

    // Step 3: Navigate to personal, then overall and team schedules page
    cy.get("nav").should("contain", "All-In-One");
    cy.get("nav").contains("Schedule").click();
    cy.get("nav").contains("Personal").click();

    cy.get("nav").contains("Schedule").click();
    cy.get("nav").contains("Overall and team").click();
  });

  it("should adjust to desktop viewport (1024px)", () => {
    cy.viewport(1024, 768); // Set viewport to 1024px width and 768px height

    // Step 3: Navigate to personal, then overall and team schedules page
    cy.get("nav").should("contain", "All-In-One");
    cy.get("nav").contains("Schedule").click();
    cy.get("nav").contains("Personal").click();

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
