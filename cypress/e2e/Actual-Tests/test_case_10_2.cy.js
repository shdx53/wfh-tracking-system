 //Test Case 10.2: Filter by Start Date
 describe('Staff Able to filter Application History', () => {
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
           // Step 3: Navigate to the "My arrangement requests" page
            cy.get('nav').should('contain', 'All-In-One');
            cy.get('nav').contains('Arrangement').click();
            cy.get('nav').contains('My requests').click();
           
            // Step 4: Navigate to the My arrangement requests page
            cy.get('button').contains('Processed').click();
            cy.wait(2000);

            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
              };
          
              // Get today's date and 3 days later from current date
              const today = new Date();
              const threeDaysLater = new Date(today);
          
              // Adjust the future dates
              threeDaysLater.setDate(today.getDate() + 3);

              // filter by date
              cy.get('input[placeholder="Start date (YYYY-MM-DD)"]')
                .click() // Click to focus on the input
                .type(formatDate(threeDaysLater).toString());

                cy.get('svg#search-icn') // Click on Search Icon
                .click();
                cy.wait(2000);


              // Check that the processed arrangement requests exists
              cy.contains(formatDate(threeDaysLater).toString()).should('exist');
              ['AM', 'Approved'].forEach((status) => {
                cy.contains(status).should('exist');
              });
        
        });

    });  