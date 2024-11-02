//Test Case 5.2: Apply for Recurring WFH Arrangement (Weekly)
describe('Apply for Recurring WFH Arrangement', () => {
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

    it('should apply for Recurring WFH Arrangement', () => {
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
    
        // Calculate dates: 5 days and 12 days later
        const dates = {
            todayDay: today.getDate(),
            twentyDaysLater: getAdjustedDate(20).getDate(),
            thirtyDaysLater: getAdjustedDate(34).getDate(),

        };

        const { todayDay, twentyDaysLater, thirtyDaysLater} = dates;

        // Changeport view
        cy.viewport(1024, 1024);

        // Step 4: Click on Recurring and Weekly radio button
        cy.get('button[value="Recurring"]').click();
        cy.get('button[value="Weekly"]').click();

        cy.get('button').contains('Pick a date').click();

        // 20 days later is a new month
        if ( todayDay > twentyDaysLater) {
            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
            
            cy.get('button[name="day"]').contains(twentyDaysLater.toString()).click();

            cy.get('body').click(); // Click on the body element (might not work if it has pointer-events: none)

            cy.get('button').contains('Pick a date').click();
            
            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button

            cy.get('button[name="day"]').contains(thirtyDaysLater.toString()).click();
            
        }

        // 20 days later in same month but 34 days later is a new month
        if ( todayDay < twentyDaysLater && twentyDaysLater > thirtyDaysLater) {
            cy.get('button[name="day"]').contains(twentyDaysLater.toString()).click();

            cy.get('body').click(); // Click on the body element (might not work if it has pointer-events: none)

            cy.get('button').contains('Pick a date').click();

            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button

            cy.get('button[name="day"]').contains(thirtyDaysLater.toString()).click();

        }
        // Interact with the <select> element
        cy.get('button[role="combobox"]').click();

        // Wait for the dropdown content to be visible (optional, for stability)
        cy.get('[role="listbox"]').should('be.visible');

         // Click on the "PM" option
        cy.contains('[role="option"]', 'PM').click(); // Ensure this matches your SelectItem structure
      

        cy.get('textarea') // Use the appropriate selector for your textarea
        .click() // Click on the textarea to focus it
        .type('Testing WFH E2E Test Case 5.2'); // Type the desired text

        // Submit
        cy.get('button[type="submit"]').click();

    });
});