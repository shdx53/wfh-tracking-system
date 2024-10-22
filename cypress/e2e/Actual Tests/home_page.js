describe('Homepage Test', () => {
  it('should load the homepage and display the correct title', () => {
    // Visit the homepage
    cy.visit('https://wfh-tracking-system.vercel.app/'); // Change the URL if needed

    // Check if the page title contains the expected text
    cy.get('h1').contains('Welcome to Next.js!');

    // Ensure a button is present and visible
    cy.get('button').should('be.visible');
  });
});