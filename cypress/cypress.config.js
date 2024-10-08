const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Base URL for your application
    supportFile: 'cypress/support/e2e.js', // Path to the support file
  },
});