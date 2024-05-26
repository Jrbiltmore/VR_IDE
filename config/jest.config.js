// jest.config.js

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transpile tests
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js' // Path to setup file for additional configuration
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'node'
  ],
};
