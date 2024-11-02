// Test Case 15.4: Display Staff Name if Already Logged In & Test Case 15.5: Responsive Design on Different Screen Sizes
describe('Attempt to Cancel Approved WFH Request', () => {
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

    it('should not see "Cancel" option', () => {
        // Step 3: Navigate to the "My arrangement requests" page
        cy.wait(1000);
        
        cy.wait(1000);

        cy.viewport(375, 667); // Set viewport to 375px width and 667px height

        cy.wait(1000);

        cy.viewport(768, 1024); // Set viewport to 768px width and 1024px height

        cy.wait(1000);

        cy.viewport(1024, 768); // Set viewport to 1024px width and 768px height

        cy.wait(1000);
        cy.contains('button', 'Manni Devi').should('exist');
        
    });
});