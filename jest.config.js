/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
    return {
      verbose: true,
      collectCoverage: true,  
      coverageDirectory: "<rootDir>/coverage",
      coverageReporters: ["text", "lcov", "json"],
      projects: [
        {
          displayName: "frontend",
          testEnvironment: "jsdom",
          testMatch: ["<rootDir>/frontend/**/*.{test.js,test.jsx}"]
        },
        {
          displayName: "backend",
          testEnvironment: "node",
          testMatch: ["<rootDir>/tests/**/*.test.js"],
          setupFilesAfterEnv: ["<rootDir>/tests/setup.js"]
        }
      ],
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
      },
      testEnvironment: "jsdom"
    };
  };
  