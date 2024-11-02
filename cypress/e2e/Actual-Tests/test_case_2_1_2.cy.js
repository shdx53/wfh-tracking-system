// Test Case 2.1: View Current and Historical Schedules of Team & Test Case 2.2: Filter by "In Office" and "WFH"
describe('View Current and Historical Schedules of Team', () => {
    // Use before to run setup code before the tests
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
        cy.get('nav').contains('Team').click();
    });

    it('should view team\'s historical and future schedules', () => {
            // Step 4: Get current dates and the 2 relevant dates
            const today = new Date();

            // Helper function to get a new date by adding/subtracting days
            const getAdjustedDate = (days) => {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + days);
            return newDate;
            };
        
            // Calculate dates: 5 days before, 2, 3, and 5 days later
            const dates = {
                todayDay: today.getDate(),
                fiveDaysBefore: getAdjustedDate(-5).getDate(),
                fiveDaysLater: getAdjustedDate(5).getDate(),
            };

            const { todayDay, fiveDaysBefore, fiveDaysLater } = dates;


        // All dates are in the current month
        if (fiveDaysBefore < todayDay && todayDay < fiveDaysLater) {
            // Click on Work From Home Tab
            cy.contains('button', 'Work-From-Home').click();

            //click on 5 days later
            cy.get('button[name="day"]').contains(fiveDaysLater).click();

            cy.contains('Dewi Putri').should('exist');
            cy.contains('PM').should('exist');

            //click on 5 days ago
            cy.get('button[name="day"]').contains(fiveDaysBefore).click();

            cy.contains('Dewi Putri').should('exist');
            cy.contains('AM').should('exist');

        }

        // 5 days later all in current month, 5 days ago in previous month
        if (fiveDaysBefore > todayDay) {
            // Click on Work From Home Tab
            cy.contains('button', 'Work-From-Home').click();

            //click on 5 days later
            cy.get('button[name="day"]').contains(fiveDaysLater).click();

            cy.contains('Dewi Putri').should('exist');
            cy.contains('PM').should('exist');

            // go previous month to check 5 days ago
            cy.get('button[name="previous-month"]').click({ multiple: true, force: true }); // Click the button

            //click on 5 days ago
            cy.get('button[name="day"]').contains(fiveDaysBefore).click();

            cy.contains('Dewi Putri').should('exist');
            cy.contains('AM').should('exist');


        }

        // 5 days later all in the next month, 5 days ago in current month
        if (fiveDaysLater < todayDay) {
            // Click on Work From Home Tab
            cy.contains('button', 'Work-From-Home').click();

            // check 5 days ago first
            cy.get('button[name="day"]').contains(fiveDaysBefore).click();

            cy.contains('Dewi Putri').should('exist');
            cy.contains('AM').should('exist');

            // go to the next month to check 5 days later
            cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button

            //click on 5 days later
            cy.get('button[name="day"]').contains(fiveDaysLater).click();
            
            cy.contains('Dewi Putri').should('exist');
            cy.contains('PM').should('exist');

        }

        });  
    });