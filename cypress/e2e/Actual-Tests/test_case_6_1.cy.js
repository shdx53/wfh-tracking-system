 // Test Case 6.1: Staff Login to WFH Tracking System
 describe('Staff Login to WFH Tracking System', () => {
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

        // Step 2: Log in as Samsul Saifullah using cy.origin for third-party login
        cy.origin('https://wfhtrackingsystem.kinde.com', () => {
        cy.get('input[name="p_username"]').type('151495');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');

        cy.get('input[name="p_password"]').type('password');
        cy.get('button[type="submit"]').click({ multiple: true });
        });
    });

    it('should view "My arrangement requests" page', () => {
        // Step 3: Navigate to the personal schedule page
            cy.get('nav').should('contain', 'All-In-One');
            cy.get('nav').contains('Schedule').click();
            cy.get('nav').contains('Personal').click();
           
            // Step 4: Navigate to the Create new arrangement page
            cy.get('nav').should('contain', 'All-In-One');
            cy.get('nav').contains('Arrangement').click();
            cy.get('nav').contains('New request').click();

        
        });

    });  
