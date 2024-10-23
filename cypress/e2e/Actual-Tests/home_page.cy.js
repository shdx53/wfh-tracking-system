describe('Homepage Test', () => {
  it('should load the homepage and display the correct title', () => {
    // Visit the homepage
    cy.visit('https://wfh-tracking-system.vercel.app/'); // Change the URL if needed

    // Check if the page title contains the expected text
    cy.get('href').contains('/_next/static/chunks/webpack-8b785e33a384d227.js');

  });
});