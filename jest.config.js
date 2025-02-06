module.exports = async () => {
  return {
    verbose: true,
    projects: [
      {
        displayName: "frontend",
        testEnvironment: "jsdom",
        testMatch: ["<rootDir>/frontend/**/*.{test.js,test.jsx}"],
        setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
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