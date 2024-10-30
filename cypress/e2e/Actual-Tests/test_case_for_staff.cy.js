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
  
    // Test Case 1.1: View Pending and Confirmed WFH Schedule
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
  
  // Test Case 1.2: Responsive Design Validation for Schedule View
  describe('Responsive Design Testing', () => {
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
    
      it('should adjust to mobile viewport (375px)', () => {
        cy.viewport(375, 667); // Set viewport to 375px width and 667px height
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
      });
    
      it('should adjust to tablet viewport (768px)', () => {
        cy.viewport(768, 1024); // Set viewport to 768px width and 1024px height
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
      });
    
      it('should adjust to desktop viewport (1024px)', () => {
        cy.viewport(1024, 768); // Set viewport to 1024px width and 768px height
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
      });
    });
  
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
  
  // Test Case 2.4: Responsive Design Validation for Team Schedule View
  describe('Responsive Design Testing', () => {
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
          cy.get('nav').contains('Team').click();
        });
    
      it('should adjust to mobile viewport (375px)', () => {
        cy.viewport(375, 667); // Set viewport to 375px width and 667px height
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
      });
    
      it('should adjust to tablet viewport (768px)', () => {
        cy.viewport(768, 1024); // Set viewport to 768px width and 1024px height
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
      });
    
      it('should adjust to desktop viewport (1024px)', () => {
        cy.viewport(1024, 768); // Set viewport to 1024px width and 768px height
        cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
      });
    });
  
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
          // Step 4: Click on Ad-hoc radio button
          cy.get('button[value="Ad-hoc"]').click();
          cy.get('button[id=":re:-form-item"]').click();
  
          // Loop to click the 'next-month' button 7 times
          for (let i = 0; i < 7; i++) {
              cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
          }
  
          cy.get('button[name="day"]').contains('9').click();
  
          cy.get('button[id=":re:-form-item"]').click();
  
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
  
          // Changeport view
          cy.viewport(1024, 1024);
  
          // Step 4: Click on Recurring and Weekly radio button
          cy.get('button[value="Recurring"]').click();
          cy.get('button[value="Weekly"]').click();
  
          cy.get('button').contains('Pick a date').click();
  
          // Loop to click the 'next-month' button 7 times
          for (let i = 0; i < 7; i++) {
              cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
          }
  
          cy.get('button[name="day"]').contains('12').click();
  
          // Click on white space
          cy.get('body').click(); // Click on the body element (might not work if it has pointer-events: none)
  
          cy.get('button').contains('Pick a date').click();
  
          // Loop to click the 'next-month' button 7 times
          for (let i = 0; i < 7; i++) {
              cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
          }
  
          cy.get('button[name="day"]').contains('30').click();
  
          // Interact with the <select> element
          cy.get('button[role="combobox"]').click();
  
          // Wait for the dropdown content to be visible (optional, for stability)
          cy.get('[role="listbox"]').should('be.visible');
  
           // Click on the "AM" option
          cy.contains('[role="option"]', 'PM').click(); // Ensure this matches your SelectItem structure
        
  
          cy.get('textarea') // Use the appropriate selector for your textarea
          .click() // Click on the textarea to focus it
          .type('Testing WFH E2E Test Case 5.2'); // Type the desired text
  
          // Submit
          cy.get('button[type="submit"]').click();
  
      });
  });
  
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
  
  
  
  //Test Case 5.6: Jack Sim WFH request will be automatically approved
  describe('Jack Sim WFH request will be automatically approved ', () => {
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
  
          // Step 2: Log in as Jack Sim using cy.origin for third-party login
          cy.origin('https://wfhtrackingsystem.kinde.com', () => {
              cy.get('input[name="p_username"]').type('130002');
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
             // Step 4: Click on Ad-hoc radio button
          cy.get('button[value="Ad-hoc"]').click();
          cy.get('button[id=":re:-form-item"]').click();
  
          // Loop to click the 'next-month' button 5 times
          for (let i = 0; i < 7; i++) {
              cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
          }
  
          cy.get('button[name="day"]').contains('9').click();
  
          cy.get('button[id=":re:-form-item"]').click();
  
         // Interact with the <select> element
         cy.get('button[role="combobox"]').click();
  
         // Wait for the dropdown content to be visible (optional, for stability)
         cy.get('[role="listbox"]').should('be.visible');
  
          // Click on the "AM" option
         cy.contains('[role="option"]', 'AM').click(); // Ensure this matches your SelectItem structure
        
  
          cy.get('textarea') // Use the appropriate selector for your textarea
          .click() // Click on the textarea to focus it
          .type('Testing WFH E2E Test Case 5.6'); // Type the desired text
  
          // Submit
          cy.get('button[type="submit"]').click();
  
          // Navigate to personal schedule page
          cy.get('nav').should('contain', 'All-In-One');
          cy.get('nav').contains('Schedule').click();
          cy.get('nav').contains('Personal').click();
  
          // Loop to click the 'next-month' button 7 times
          for (let i = 0; i < 7; i++) {
          cy.get('button[name="next-month"]').click({ multiple: true, force: true }); // Click the button
      }
  
      cy.get('button[name="day"]').contains('9').click();
      cy.contains('AM').should('exist');
      cy.contains('Pending').should('not.exist');
      cy.contains('Work-From-Home').should('exist');
      });
  });
  
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
  
// Test Case 10.1: View Application History
describe('Staff Able to View Application History', () => {
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

    it('should view "My Schedule" page and "Create new arrangement" page', () => {
           // Step 3: Navigate to the "My arrangement requests" page
            cy.get('nav').should('contain', 'All-In-One');
            cy.get('nav').contains('Arrangement').click();
            cy.get('nav').contains('My requests').click();
           
            // Step 4: Navigate to the Create new arrangement page
            cy.get('button').contains('Processed').click();

            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
              };
          
              // Get today's date
              const today = new Date();
              const threeDaysLater = new Date(today);
              const fourDaysLater = new Date(today);
              const sixDaysLater = new Date(today);
          
              // Adjust the future dates
              threeDaysLater.setDate(today.getDate() + 3);
              fourDaysLater.setDate(today.getDate() + 4);
              sixDaysLater.setDate(today.getDate() + 6);

    
              cy.contains(formatDate(threeDaysLater).toString()).should('exist');
              cy.contains(formatDate(fourDaysLater).toString()).should('exist');
              cy.contains(formatDate(sixDaysLater).toString()).should('exist');
              ['AM', 'Approved', 'Rejected', 'Withdrawn'].forEach((status) => {
                cy.contains(status).should('exist');
              });
        
        });

    });  


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
  

    // /Test Case 10.3: Edge Case - No WFH Application History Exists
describe('Staff do not have WFH Arrangement History', () => {
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

        // Step 2: Log in as Nara Young using cy.origin for third-party login
        cy.origin('https://wfhtrackingsystem.kinde.com', () => {
        cy.get('input[name="p_username"]').type('151513');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');

        cy.get('input[name="p_password"]').type('password');
        cy.get('button[type="submit"]').click({ multiple: true });
        });
    });

    it('should show "No arrangement requests found."', () => {
           // Step 3: Navigate to the "My arrangement requests" page
            cy.get('nav').should('contain', 'All-In-One');
            cy.get('nav').contains('Arrangement').click();
            cy.get('nav').contains('My requests').click();
           
            cy.contains('No arrangement requests found.').should('exist');

            // Step 4: Navigate to the Processed tab
            cy.get('button').contains('Processed').click();
    
            cy.contains('No arrangement requests found.').should('exist');

        
        });

    });  


  
  