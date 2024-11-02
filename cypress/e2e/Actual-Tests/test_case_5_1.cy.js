 // Test Case 5.1: Apply for Ad-Hoc WFH Arrangement
 describe('Apply for Ad-Hoc WFH Arrangement', () => {
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

        
        // Step 3: Navigate to the new arrangement page
        cy.get('nav').should('contain', 'All-In-One');
        cy.get('nav').contains('Arrangement').click();
        cy.get('nav').contains('New request').click();
    });

    it('should apply for Ad-hoc WFH Arrangement', () => {
        const today = new Date();

        // Helper function to get a new date by adding/subtracting days
        const adjustForWeekend = (date) => {
            const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            if (dayOfWeek === 6) { // Saturday
                date.setDate(date.getDate() + 2); // Add 2 days
            } else if (dayOfWeek === 0) { // Sunday
                date.setDate(date.getDate() + 1); // Add 1 day
            }
            return date;
        };
        
        // Helper function to get a new date by adding/subtracting days
        const getAdjustedDate = (days) => {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + days);
            return adjustForWeekend(newDate);
        };
    
        // Calculate dates: 5 days later
        const dates = {
            todayDay: today.getDate(),
            fiftenDaysLater: getAdjustedDate(15).getDate(),

        };

        const { todayDay, fiftenDaysLater} = dates;

          // Step 4: Click on Ad-hoc radio button
          cy.get('button[value="Ad-hoc"]').click();
          cy.get('button[id=":re:-form-item"]').click();

         // 15 days later is a new month
         if ( todayDay > fiftenDaysLater) {
            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
            cy.get('button[name="day"]').contains(fiftenDaysLater.toString()).click();
            cy.get('button[id=":re:-form-item"]').click();
         };

        // 15 days later in the same month
        if ( todayDay < fiftenDaysLater) {
            cy.get('button[name="day"]').contains(fiftenDaysLater.toString()).click();
            cy.get('button[id=":re:-form-item"]').click();

        };
            
        // Interact with the <select> element
        cy.get('button[role="combobox"]').click();
  
        // Wait for the dropdown content to be visible (optional, for stability)
        cy.get('[role="listbox"]').should('be.visible');
 
         // Click on the "AM" option
        cy.contains('[role="option"]', 'AM').click(); // Ensure this matches your SelectItem structure
       
 
         cy.get('textarea') // Use the appropriate selector for your textarea
         .click() // Click on the textarea to focus it
         .type('Testing WFH E2E Test Case 5.1'); // Type the desired text
 
         // Submit
         cy.get('button[type="submit"]').click();
 

    });
});
