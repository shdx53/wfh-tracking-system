describe('Homepage Test', () => {
  it('should load the homepage and display the correct title', () => {
    // Visit the homepage
    cy.visit('https://wfh-tracking-system.vercel.app/'); // Change the URL if needed

    // Log the current URL
    cy.url().then((url) => {
      console.log('Current URL:', url);
    });

    // Check if the page loads successfully
    cy.get('body').should('be.visible');

    // Check if 'Nav Bar' is visible on the page
    cy.get('div').should('contain','All-In-One')

    // Check if 'Home Page'
        
  });
});