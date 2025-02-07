module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};
