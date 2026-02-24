module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 30000,
    setupFilesAfterEnv: ['./tests/setup.js'],
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
    collectCoverageFrom: [
        'controllers/**/*.js',
        'models/**/*.js',
        'utils/**/*.js',
        'middleware/**/*.js',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
};
