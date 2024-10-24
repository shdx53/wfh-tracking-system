describe('View Team\'s Schedule for Manager/Director', () => {
  it('should view team\'s historical and future schedules', () => {
    // Step 1: Visit the homepage
    cy.visit('https://wfh-tracking-system.vercel.app/'); // Change the URL if needed

    // Check if the page loads successfully
    cy.get('body').should('be.visible');

    // Check if 'Nav Bar' is visible on the page
    cy.get('nav').should('contain','All-In-One')

    // Click to Login Screen
    cy.get('a').click();

    // Step 2: Login as Sophia Toh
    // use of cy.origin as base url has changed for third-party authenticator
    cy.origin('https://wfhtrackingsystem.kinde.com', () => {
      // Input Staff ID
      cy.get('input[name="p_username"]').type('140103');
      cy.get('button[type="submit"]').click();

      // Wait for the password input to be visible
      cy.get('input[name="p_password"]', { timeout: 10000 }).should('be.visible');

      cy.get('input[name="p_password"]').type('password');
      cy.get('button[type="submit"]').click({multiple: true });

    })

    // Step 3: Navigate to team schedules page
    cy.get('nav').should('contain','All-In-One')
    cy.get('nav').contains('Schedule').click()
    cy.get('nav').contains('Team').click();

    /* // Step 4: Verify schedules for Bui Nguyen
    cy.contains('Bui Nguyen').parent().within(() => {
      cy.contains('Account Manager');
      cy.contains('approved arrangement 5 days ago, AM');
      cy.contains('approved arrangement 5 days later, PM');
    });

    // Verify schedules for Dewi Putri
    cy.contains('Dewi Putri').parent().within(() => {
      cy.contains('Account Manager');
      cy.contains('approved arrangement 5 days ago, AM');
      cy.contains('approved arrangement 5 days later, PM');
    });

    // Verify schedules for Jaclyn Lee
    cy.contains('Jaclyn Lee').parent().within(() => {
      cy.contains('Sales Manager');
      cy.contains('approved arrangement 5 days ago, AM');
      cy.contains('approved arrangement 5 days later, PM');
    }); */
  });
});