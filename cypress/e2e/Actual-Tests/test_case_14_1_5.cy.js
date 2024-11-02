// Test Case 14.1: Cancel Pending Ad-hoc WFH Request & Test Case 14.4: View Details of Pending Ad-hoc WFH Request Before Cancelling
// Test Case 14.5: View Details of Pending Recurring WFH Request Before Canceling

describe('Cancel pending Ad-hoc WFH Request', () => {
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

    it('should be able to cancel Ad-hoc pending arrangements', () => {
        // Step 3: Navigate to the "My arrangement requests" page
        cy.get('nav').should('contain', 'All-In-One');
        cy.get('nav').contains('Arrangement').click();
        cy.get('nav').contains('My requests').click();
        
        cy.get('button').contains('Pending').click();
        cy.wait(2000);

        // Step 4: Navigate to the my arrangement request page
        cy.get('button[id="arrangement-sheet-trigger"]').eq(0).click({ force: true });

        cy.wait(2000);

        // Interact with the <select> element
        cy.get('button[role="combobox"]').first().click(); // Click the first matching button
    
        cy.wait(2000);

        // Wait for the dropdown content to be visible (optional, for stability)
        cy.get('[role="listbox"]').should('be.visible');
 
         // Click on the "AM" option
         cy.get('[role="option"]').contains('Cancel').click();

        // Submit
        cy.get('button[type="submit"]').click();
        
        cy.contains('Arrangement(s) updated successfully').should('exist');
        
    });
});