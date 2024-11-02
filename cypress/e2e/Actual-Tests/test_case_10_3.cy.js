 // /Test Case 10.3: Edge Case - No WFH Application History Exists
 describe('Staff do not have WFH Arrangement History', () => {
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

        // Step 2: Log in as Nara Young using cy.origin for third-party login
        cy.origin('https://wfhtrackingsystem.kinde.com', () => {
        cy.get('input[name="p_username"]').type('151513');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');

        cy.get('input[name="p_password"]').type('password');
        cy.get('button[type="submit"]').click({ multiple: true });
        });
    });

    it('should show "No arrangement requests found."', () => {
           // Step 3: Navigate to the "My arrangement requests" page
            cy.get('nav').should('contain', 'All-In-One');
            cy.get('nav').contains('Arrangement').click();
            cy.get('nav').contains('My requests').click();
           
            cy.contains('No arrangement requests found.').should('exist');

            // Step 4: Navigate to the Processed tab
            cy.get('button').contains('Processed').click();
    
            cy.contains('No arrangement requests found.').should('exist');

        
        });

    });  