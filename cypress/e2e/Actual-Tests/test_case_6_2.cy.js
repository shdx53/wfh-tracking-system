 //Test Case 6.2: Edge Case - Invalid Login Credentials
 describe('Invalid Login Credentials', () => {
    // Use before to run setup code before the tests
    beforeEach(() => {
        // Step 1: Visit the homepage and log in once
        cy.visit('https://wfh-tracking-system.vercel.app/'); // Adjust the URL if needed

        // Ensure the page has loaded
        cy.get('body').should('be.visible');

        // Verify the 'Nav Bar' is visible
        cy.get('nav').should('contain', 'All-In-One');

        // Navigate to the login page
        cy.get('a').click();
    });

    it('should show "No account found with this username', () => {
         // Step 2: Invalid Staff ID using cy.origin for third-party login
         cy.origin('https://wfhtrackingsystem.kinde.com', () => {
            cy.get('input[name="p_username"]').type('000000');
            cy.get('button[type="submit"]').click();
            cy.contains('No account found with this username',)
            cy.wait(2000);

        });
        });

    it('should show "Please provide a valid password"', () => {
        // Step 3: Valid Staff ID and invalid password using cy.origin for third-party login
        cy.origin('https://wfhtrackingsystem.kinde.com', () => {
            cy.get('input[name="p_username"]').type('151495');
            cy.get('button[type="submit"]').click();    
    
            cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');
    
            cy.get('input[name="p_password"]').type('helloworld');
            cy.get('button[type="submit"]').click({ multiple: true });
            cy.contains('Please provide a valid password') });

            });
        
        });