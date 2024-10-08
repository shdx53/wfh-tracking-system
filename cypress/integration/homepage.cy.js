describe('Basic test', () => {
    it('Visits the home page', () => {
      cy.visit('/'); // Visit the home page
      cy.contains('Welcome'); // Check for a welcome message
    });
  });