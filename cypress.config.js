import { defineConfig } from "cypress";
import codeCoverage from '@cypress/code-coverage/task';

export default defineConfig({
  projectId: "5cw9tf",

  e2e: {
    setupNodeEvents(on, config) {
      // Integrating Cypress code coverage plugin for E2E tests
      codeCoverage(on, config);
      return config;
    },
    baseUrl: 'https://wfh-tracking-system.vercel.app/', // Adjust this based on your app
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      // Integrating Cypress code coverage plugin for component tests
      codeCoverage(on, config);
      return config;
    }
  },
});
