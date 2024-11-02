// Test Case 1.3: No WFH Requests
describe('No WFM Requests', () => {
    beforeEach(() => {
        // Step 1: Visit the homepage and log in once
        cy.visit('https://wfh-tracking-system.vercel.app/'); // Adjust the URL if needed
    
        // Ensure the page has loaded
        cy.get('body').should('be.visible');
    
        // Verify the 'Nav Bar' is visible
        cy.get('nav').should('contain', 'All-In-One');
    
        // Navigate to the login page
        cy.get('a').click();
    
        // Step 2: Log in as Bui Nguyen using cy.origin for third-party login
        cy.origin('https://wfhtrackingsystem.kinde.com', () => {
          cy.get('input[name="p_username"]').type('140893');
          cy.get('button[type="submit"]').click();
    
          cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');
    
          cy.get('input[name="p_password"]').type('password');
          cy.get('button[type="submit"]').click({ multiple: true });
        });
    
        // Step 3: Navigate to the personal schedule page
        cy.get('nav').should('contain', 'All-In-One');
        cy.get('nav').contains('Schedule').click();
        cy.get('nav').contains('Personal').click();
      });
    
         
    it('should adjust to mobile viewport (375px) and show no WFH Arrangements', () => {

        // Set viewport to below 1024px
        cy.viewport(375, 667); 
        
        // month with 30 days have a total of 60 buttons in total on the page
        // Click twice to get to a month without any WFH Requests
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button

        // Get the number of day buttons on the page
        cy.get('button[name="day"]').then(($buttons) => {
            let daysCount = $buttons.length; // Get the count of buttons
            if (daysCount === 60) {
                daysCount = 30;
            } else if (daysCount === 62) {
                daysCount = 31;
            } else if (daysCount === 56) {
                daysCount = 28;
            } else if (daysCount === 58) {
                daysCount = 29;
            }
            cy.wrap(daysCount).as('daysCount'); // Store it as an alias
        });
    
      // Use the alias in the for-loop
      cy.get('@daysCount').then((daysCount) => {
        const maxDay = Math.min(daysCount, 31); // Ensure it doesn't exceed 31

        // No arrangement found for everyday of that month
        
        for (let day = 1; day <= maxDay; day++) {
            // Check if the button exists before clicking
            cy.get('button[name="day"]').contains(day.toString()).then(($button) => {
            if ($button.length) { // Check if the button exists
                cy.wrap($button).click(); // Click the button if it exists
                cy.contains('No arrangements found for the selected date.').should('exist');
            } else {
                cy.log(`Button for day ${day} does not exist.`);
            }
            });
        }    
    });
    });

    
        it('should adjust to desktop viewport (1024px) and show an empty grid layout by default.', () => {
        cy.viewport(1024, 768); // Set viewport to 1024px width and 768px height
        
        // Click twice to get to a month without any WFH Requests
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
        
            // Check for empty grids without text
            cy.should('not.contain', 'No arrangements found for the selected date.')
            .and('not.contain', 'AM')
            .and('not.contain', 'PM')
            .and('not.contain', 'All Day')
            .and('not.contain', 'WFH'); // Combine assertions
        });
    });