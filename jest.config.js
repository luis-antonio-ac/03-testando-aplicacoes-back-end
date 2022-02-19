export default {
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^controllers/(.*)$": "<rootdir>/src/controllers/$1",
    "^middlewares/(.*)$": "<rootdir>/src/middlewares/$1",
    "^services/(.*)$": "<rootdir>/src/services/$1",
  },
};
