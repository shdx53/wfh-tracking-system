// Test Case 12.4: Edge Case - Wihtdrawal Less than 24hours Before WFH Day
describe("Manager/Director Try to Withdraw Ad-Hoc WFH Arrangement of Staff Member", () => {
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

  it("should not be able to withdraw WFH arrangements less than 24 hours before the WFH day", () => {
    // Ensure the page has loaded
    cy.get("body").should("be.visible");
    cy.reload();

    // Step 3: Navigate to Requests page
    cy.get("nav", { timeout: 10000 }).should("contain", "All-In-One");
    cy.get("nav", { timeout: 10000 }).contains("Arrangement").click();
    cy.get("nav", { timeout: 10000 }).contains("All requests").click();

    // Step 4: Withdraw Entire Arrangement
    function addDaysToCurrentDate(days) {
      const currentDate = new Date();
      currentDate.setUTCDate(currentDate.getUTCDate() + days);

      const year = currentDate.getUTCFullYear();
      const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getUTCDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
    let dateLater = addDaysToCurrentDate(0);

    cy.get('[role="tablist"]').contains("Processed").click();

    cy.get('input[placeholder="Employee"]').type("John");
    cy.get('input[placeholder="Start date (YYYY-MM-DD)"]').type(dateLater);
    cy.wait(2000);
    cy.get('svg[class="lucide lucide-search cursor-pointer"]').click({
      multiple: true,
    });

    cy.get('[role="tabpanel"]')
    .first()
    .find('svg.lucide.lucide-arrow-up-right')
    .should('not.exist');

  });
});
