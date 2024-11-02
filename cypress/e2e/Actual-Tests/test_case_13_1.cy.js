//Test Case 13.1: Withdraw Entire Approved Recurring WFH Arrangement
describe('Withdraw Entire Approved Recurring WFH Arrangement ', () => {
    // Use before to run setup code before the tests
    before(() => {
        // Step 1: Visit the homepage and log in once
        cy.visit('https://wfh-tracking-system.vercel.app/'); // Adjust the URL if needed

        // Ensure the page has loaded
        cy.get('body').should('be.visible');

        // Verify the 'Nav Bar' is visible
        cy.get('nav').should('contain', 'All-In-One');

        // Navigate to the login page
        cy.get('a').click();

        // Step 2: Log in as Manni Devi using cy.origin for third-party login
        cy.origin('https://wfhtrackingsystem.kinde.com', () => {
            cy.get('input[name="p_username"]').type('210018');
            cy.get('button[type="submit"]').click();

            cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');

            cy.get('input[name="p_password"]').type('password');
            cy.get('button[type="submit"]').click({ multiple: true });
        });
    });

    it('should be able to withdraw approved arrangements', () => {
        // Step 3: Navigate to the "My arrangement requests" page
        cy.get('nav').should('contain', 'All-In-One');
        cy.get('nav').contains('Arrangement').click();
        cy.get('nav').contains('My requests').click();
        
        cy.get('button').contains('Processed').click();
        cy.wait(2000);

        cy.get('button[id="arrangement-sheet-trigger"]').eq(2).click({ force: true });

        // Interact with the <select> element
        cy.get('button[role="combobox"]').first().click(); // Click the first matching button
    
  
        // Wait for the dropdown content to be visible (optional, for stability)
        cy.get('[role="listbox"]').should('be.visible');
 
         // Click on the "AM" option
         cy.get('[role="option"]').contains('Withdraw entire arrangement').click();

        cy.get('textarea') // Use the appropriate selector for your textarea
        .click() // Click on the textarea to focus it
        .type('Testing WFH E2E Test Case 13.1'); // Type the desired text

        // Submit
        cy.get('button[type="submit"]').click();
        
        cy.contains('Arrangement(s) updated successfully').should('exist');
        
    });
});  