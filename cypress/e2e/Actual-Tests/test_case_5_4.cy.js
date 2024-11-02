 // Test Case 5.4: WFH Request Cannot be Submitted Less Than 24 Hours in Advance
 describe('Apply WFH Arrangement that is less than 24 hours Rejected Automatically ', () => {
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

    it('should apply for Recurring WFH Arrangement and is automatically rejected', () => {
        const today = new Date();

    // Helper function to get a new date by adding days, hours, minutes, and seconds
    const getAdjustedDate = (days = 0, hours = 0, minutes = 0, seconds = 0) => {
        const newDate = new Date(); // Use the current date
        newDate.setDate(newDate.getDate() + days); // Adjust days
        newDate.setHours(newDate.getHours() + hours); // Adjust hours
        newDate.setMinutes(newDate.getMinutes() + minutes); // Adjust minutes
        newDate.setSeconds(newDate.getSeconds() + seconds); // Adjust seconds
        return newDate;
    };

    // Add 23 hours, 59 minutes, and 59 seconds to the current time
    const adjustedDate = getAdjustedDate(0, 23, 59, 59);

    // Example: Display the adjusted day and time
    const dates = {
        todayDay: new Date().getDate(), // Current date and time
        adjustedDay: adjustedDate.getDate, // Adjusted date and time
    };

        const { todayDay, adjustedDay } = dates;

        // Changeport view
        cy.viewport(1024, 1024);

         // Step 4: Click on Ad-hoc radio button
         cy.get('button[value="Ad-hoc"]').click();
         cy.get('button[id=":re:-form-item"]').click();

        // Next day is in the same month
        if ( todayDay < adjustedDay || todayDay === adjustedDate) {
            cy.get('button[name="day"]').contains(adjustedDay.toString()).should('be.disabled');;
        }

        // Next day is in a new month
        if ( todayDay > adjustedDay) {
            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
            cy.get('button[name="day"]').contains(adjustedDay.toString()).should('be.disabled');;
        }
    });
});
