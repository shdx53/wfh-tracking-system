// Test Case 2.3: No Team Members Available
describe('No team members Available', () => {
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

        // Step 2: Log in as Jack Sim using cy.origin for third-party login
        cy.origin('https://wfhtrackingsystem.kinde.com', () => {
            cy.get('input[name="p_username"]').type('130002');
            cy.get('button[type="submit"]').click();

            cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');

            cy.get('input[name="p_password"]').type('password');
            cy.get('button[type="submit"]').click({ multiple: true });
        });
    });

    it('should be able to cancel Ad-ho', () => {
        // Step 3: Navigate to the Team Schedule page
        cy.get('nav').should('contain', 'All-In-One');
        cy.get('nav').contains('Schedule').click();
        cy.get('nav').contains('Team').click();
        
        cy.wait(2000);

        // Check no team members in office tab
        // Code check there is no tab banner with the below class
        cy.get('.flex.justify-between.rounded-lg.border-l-\\[10px\\].p-6.bg-teal-100\\/40.border-teal-700').should('not.exist');
        

        // Check no team members working from home tab
        cy.wait(2000);
        cy.contains('button', 'Work-From-Home').click();

        cy.get('.flex.justify-between.rounded-lg.border-l-\\[10px\\].p-6.bg-teal-100\\/40.border-teal-700').should('not.exist');

        // No team in leave tab
        cy.wait(2000);
        cy.contains('button', 'Leave').click();
        cy.get('.flex.justify-between.rounded-lg.border-l-\\[10px\\].p-6.bg-teal-100\\/40.border-teal-700').should('not.exist');

        
    });
});