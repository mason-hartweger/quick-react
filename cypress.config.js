const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xtuvtu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5174/",
  },
});
