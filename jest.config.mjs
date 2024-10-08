import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  // Your custom Jest configuration
};

export default createJestConfig(customJestConfig);