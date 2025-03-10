module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{test, spec}.{ts, tsx}'],
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: [
        '<rootDir>/src/test/setup.ts'
    ],
    testEnvironment: 'jsdom',
}