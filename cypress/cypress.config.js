const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register code coverage tasks
      codeCoverageTask(on, config);

      // Additional node event listeners can be added here

      // Return the modified config object for coverage
      return config;
    },
    baseUrl: 'http://localhost:3000', // Base URL for your application
    supportFile: 'cypress/support/e2e.js', // Path to the support file
  },
});
