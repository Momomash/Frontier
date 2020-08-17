module.exports = {
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/internals/jestSettings.js'],
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
};
