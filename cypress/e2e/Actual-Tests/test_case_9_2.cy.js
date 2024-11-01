// Test Case 9.2:
describe("Manager/Director View Approved, Rejected and Withdrawn WFH Requests for Team Members", () => {
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

  it("should view processed wfh requests for team members", () => {
    // Ensure the page has loaded
    cy.get("body").should("be.visible");
    cy.reload();

    // Step 3: Navigate to Requests page
    cy.get("nav", { timeout: 10000 }).should("contain", "All-In-One");
    cy.get("nav", { timeout: 10000 }).contains("Arrangement").click();
    cy.get("nav", { timeout: 10000 }).contains("All requests").click();

    // Step 4: Verify requests
    cy.get('[role="tablist"]').contains("Processed").click();

    // John Lim
    cy.get(
      '[class="mx-auto grid max-w-md grid-cols-10 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:grid-cols-11 sm:gap-4 lg:grid-cols-12 xl:grid-cols-8"]',
    )
      .first()
      .within(() => {
        cy.contains("John Lim").should("be.visible");
        cy.contains("Full Day").should("be.visible");
        cy.contains("Withdrawn").should("be.visible");
      });

    cy.get(
      '[class="mx-auto grid max-w-md grid-cols-10 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:grid-cols-11 sm:gap-4 lg:grid-cols-12 xl:grid-cols-8"]',
    )
      .eq(1)
      .within(() => {
        cy.contains("John Lim").should("be.visible");
        cy.contains("AM").should("be.visible");
        cy.contains("Approved").should("be.visible");
      });

    cy.get(
      '[class="mx-auto grid max-w-md grid-cols-10 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:grid-cols-11 sm:gap-4 lg:grid-cols-12 xl:grid-cols-8"]',
    )
      .eq(2)
      .within(() => {
        cy.contains("John Lim").should("be.visible");
        cy.contains("Full Day").should("be.visible");
        cy.contains("Rejected").should("be.visible");
      });

    cy.scrollTo("bottom");

    // Samsul Saifullah
    cy.get(
      '[class="mx-auto grid max-w-md grid-cols-10 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:grid-cols-11 sm:gap-4 lg:grid-cols-12 xl:grid-cols-8"]',
    )
      .eq(5)
      .within(() => {
        cy.contains("Samsul Saifullah").should("be.visible");
        cy.contains("AM").should("be.visible");
        cy.contains("Approved").should("be.visible");
      });

    cy.get(
      '[class="mx-auto grid max-w-md grid-cols-10 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:grid-cols-11 sm:gap-4 lg:grid-cols-12 xl:grid-cols-8"]',
    )
      .eq(7)
      .within(() => {
        cy.contains("Samsul Saifullah").should("be.visible");
        cy.contains("AM").should("be.visible");
        cy.contains("Rejected").should("be.visible");
      });

    cy.contains("Next").click();

    cy.get(
      '[class="mx-auto grid max-w-md grid-cols-10 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:grid-cols-11 sm:gap-4 lg:grid-cols-12 xl:grid-cols-8"]',
    )
      .first()
      .within(() => {
        cy.contains("Samsul Saifullah").should("be.visible");
        cy.contains("AM").should("be.visible");
        cy.contains("Withdrawn").should("be.visible");
      });
  });
});
