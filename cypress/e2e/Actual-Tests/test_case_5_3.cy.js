// Test Case 5.3: WFH Request with Overlapping Dates
 describe('Unable to apply for WFH Arrangement With Overlapping Dates ', () => {
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

    it('should be unable to apply for Overlapping WFH Arrangement', () => {
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
    
        // Calculate dates: 5 days and 14 days later
        const dates = {
            todayDay: today.getDate(),
            fiveDaysLater: getAdjustedDate(5).getDate(),
            fourteenDaysLater: getAdjustedDate(14).getDate(),

        };

        const { todayDay, fiveDaysLater, fourteenDaysLater} = dates;

        // Changeport view
        cy.viewport(1024, 1024);

        // Step 4: Click on Recurring and Weekly radio button
        cy.get('button[value="Recurring"]').click();
        cy.get('button[value="Weekly"]').click();

        // 14 days later is a same month
        if ( todayDay < fourteenDaysLater) {
            cy.get('button').contains('Pick a date').click();
            cy.get('button[name="day"]').contains(fiveDaysLater.toString()).click();

            cy.get('body').click(); // Click on the body element (might not work if it has pointer-events: none)

            cy.get('button').contains('Pick a date').click();

            cy.get('button[name="day"]').contains(fourteenDaysLater.toString()).click();

            cy.get('button[role="combobox"]').click();

            cy.get('[role="listbox"]').should('be.visible');


        }

        // 5 days later is a new month
        if ( todayDay > fiveDaysLater) {
            cy.get('button').contains('Pick a date').click();
            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
            
            cy.get('button[name="day"]').contains(fiveDaysLater.toString()).click();

            cy.get('body').click(); // Click on the body element (might not work if it has pointer-events: none)

            cy.get('button').contains('Pick a date').click();
            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button

            cy.get('button[name="day"]').contains(fourteenDaysLater.toString()).click();

            cy.get('button[role="combobox"]').click();

            cy.get('[role="listbox"]').should('be.visible');

            
            //cy.get('button[name="day"]').contains(fiveDaysLater.toString()).should('be.disabled');;
        }

        // 5 days later in same month but 12 days later is a new month
        if ( todayDay < fiveDaysLater && todayDay > fourteenDaysLater) {
            cy.get('button').contains('Pick a date').click();
            cy.get('button[name="day"]').contains(fiveDaysLater.toString()).should('be.disabled');;

            cy.get('body').click(); // Click on the body element (might not work if it has pointer-events: none)

            cy.get('button').contains('Pick a date').click();

            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button

            cy.get('button[name="day"]').contains(fourteenDaysLater.toString()).click();

            cy.get('button[role="combobox"]').click();

            cy.get('[role="listbox"]').should('be.visible');

        }
    });
});