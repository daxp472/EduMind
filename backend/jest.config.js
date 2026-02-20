module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 30000,
    setupFilesAfterEnv: ['./tests/setup.js'],
    testMatch: ['**/tests/**/*.test.js'],
};
