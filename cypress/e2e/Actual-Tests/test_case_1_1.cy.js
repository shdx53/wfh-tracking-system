// Test Case 1.1: View Pending and Confirmed WFH Schedule
describe('View Personal Schedule for Staff', () => {
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
      cy.get('nav').contains('Personal').click();
    });
  
    it('should view personal historical and future schedules', () => {
          // Step 4: Get current dates and the 4 relevant dates
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
              twoDaysLater: getAdjustedDate(2).getDate(),
              threeDaysLater: getAdjustedDate(3).getDate(),
              fiveDaysLater: getAdjustedDate(5).getDate(),
          };
  
          const { todayDay, fiveDaysBefore, twoDaysLater, threeDaysLater, fiveDaysLater } = dates;
  
  
      // All dates are in the current month
      if (fiveDaysBefore < todayDay && todayDay < fiveDaysLater) {
          // check all dates
  
          //click on 2 days later
          cy.get('button[name="day"]').contains(twoDaysLater).click();
          cy.contains('All Day').should('exist');
          cy.contains('Pending').should('exist');
          cy.contains('Work-From-Home').should('exist');
  
          //click on 3 days later
          cy.get('button[name="day"]').contains(threeDaysLater).click();
          cy.contains('All Day').should('exist');
          cy.contains('Pending').should('exist');
          cy.contains('Work-From-Home').should('exist');
  
          //click on 5 days later
          cy.get('button[name="day"]').contains(fiveDaysLater).click();
          cy.contains('PM').should('exist');
          cy.contains('Work-From-Home').should('exist');
  
          //click on 5 days ago
          cy.get('button[name="day"]').contains(fiveDaysBefore).click();
          cy.contains('AM').should('exist');
          cy.contains('Work-From-Home').should('exist');
  
  
      }
  
          // 2,3 and 5 days later all in current month, 5 days ago in previous month
          if (fiveDaysBefore > todayDay) {
              // check all the 2,3 and 5 days later first 
  
              //click on 2 days later
              cy.get('button[name="day"]').contains(twoDaysLater).click();
              cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 3 days later
              cy.get('button[name="day"]').contains(threeDaysLater).click();
              cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 5 days later
              cy.get('button[name="day"]').contains(fiveDaysLater).click();
              cy.contains('PM').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              // go previous month to check 5 days ago
              cy.get('button[name="previous-month"]').click({ multiple: true, force: true }); // Click the button
  
              //click on 5 days ago
              cy.get('button[name="day"]').contains(fiveDaysBefore).click();
              cy.contains('AM').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
  
          }
  
          // 2,3 and 5 days later all in the next month, 5 days ago in current month
          if (twoDaysLater < todayDay) {
              // check 5 days ago first
              cy.get('button[name="day"]').contains(fiveDaysBefore).click();
              cy.contains('AM').should('exist');
              cy.contains('Work-From-Home').should('exist');
              
              // go to the next month to check 2,3,5 days later
              cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
  
              //click on 2 days later
              cy.get('button[name="day"]').contains(twoDaysLater).click();
              cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 3 days later
              cy.get('button[name="day"]').contains(threeDaysLater).click();
              cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 5 days later
              cy.get('button[name="day"]').contains(fiveDaysLater).click();
              cy.contains('PM').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
          }
  
          // 3 and 5 days later in the next month, 2 days later and 5 days ago in current month
          if (threeDaysLater < todayDay && twoDaysLater > todayDay) {
              // check 2 days later and 5 days ago first
  
               //click on 2 days later
               cy.get('button[name="day"]').contains(twoDaysLater).click();
               cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 5 days ago
              cy.get('button[name="day"]').contains(fiveDaysBefore).click();
              cy.contains('AM').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              // go to the next month to check 3,5 days later
              cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
  
              //click on 3 days later
              cy.get('button[name="day"]').contains(threeDaysLater).click();
              cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 5 days later
              cy.get('button[name="day"]').contains(fiveDaysLater).click();
              cy.contains('PM').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
          }
  
          // 5 days later in the next month, 2,3 days later and 5 days ago in current month
          if (fiveDaysLater < todayDay && threeDaysLater > todayDay) {
              // check 2,3 days later and 5 days ago first
              
              //click on 2 days later
              cy.get('button[name="day"]').contains(twoDaysLater).click();
              cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 3 days later
              cy.get('button[name="day"]').contains(threeDaysLater).click();
              cy.contains('All Day').should('exist');
              cy.contains('Pending').should('exist');
              cy.contains('Work-From-Home').should('exist');
  
              //click on 5 days ago
              cy.get('button[name="day"]').contains(fiveDaysBefore).click();
              cy.contains('AM').should('exist');
              cy.contains('Work-From-Home').should('exist');
              
              // go to the next month to check 5 days later
              cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
  
              //click on 5 days later
              cy.get('button[name="day"]').contains(fiveDaysLater).click();
              cy.contains('PM').should('exist');
              cy.contains('Work-From-Home').should('exist');
          }
      });  
    });