export default {
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^services/(.*)$": "<rootDir>/src/services/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  testMatch: ["**/*.unit.js", "**/__tests__/*.js?(x)"],
};
