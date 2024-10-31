// Test Case 4.1:
describe("View work schedules of departments/teams for HR/Senior Management", () => {
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
      cy.contains('button[type="submit"]', 'Continue').click({ multiple: true });
    });
   
  });

  it("should view departmental work schedule", () => {
    // Ensure the page has loaded
    cy.get("body").should("be.visible");

    // Step 3: Navigate to team schedules page
    cy.get("nav", { timeout: 10000 }).should("contain", "All-In-One");
    cy.get("nav", { timeout: 10000 }).contains("Schedule").click();
    cy.get("nav", { timeout: 10000 }).contains("Team").click();

    // Step 4: Navigate to Overall schedules page
    cy.get("nav").contains("Schedule").click();
    cy.get("nav").contains("Overall and team").click();

    // Step 5: Click on dropdown to select through all departments

    // List of options to click
    const options = [
      "Test",
      "MD",
      "Director",
      "Account Manager",
      "Sales Manager",
      "Senior Engineers",
      "Junior Engineers",
      "Call Centre",
      "Operation Planning Team",
      "HR Team",
      "LD Team",
      "Admin Team",
      "Finance Executive",
      "Finance Manager",
      "Counsultant",
      "Developers",
      "Support Team",
      "IT Team",
    ];

    // Loop through each option and perform the click and assertion
    options.forEach((option) => {
      // Interact with dropdown element
      cy.get('button[role="combobox"]').click();

      // Wait for the dropdown content to be visible
      cy.get('[role="listbox"]').should("be.visible");

      // Select individual option
      cy.get('[role="option"]').contains(option).click();
      cy.get('[role="tabpanel"]', { timeout: 10000 }).should(
        "contain",
        "Employee Count",
      );
    });
  });
});
