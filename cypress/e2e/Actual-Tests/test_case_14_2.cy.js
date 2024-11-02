// Test Case 14.2: Cancel Pending Recurring WFH Request
describe('Cancel Pending Reucrring WFH Request', () => {
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
        for (let i = 0; i < 4; i++) {
            cy.get('button[role="combobox"]').eq(i).click(); // Click the first matching button
        
            // Add a delay for stability
            cy.wait(1000);
        
            // Ensure the dropdown is visible
            cy.get('[role="listbox"]').should('be.visible');
        
            // Click on the "Cancel" option
            cy.get('[role="option"]').contains('Cancel').click();
        }        

        // Submit
        cy.get('button[type="submit"]').click();
        
        cy.contains('Arrangement(s) updated successfully').should('exist');
        
    });
});