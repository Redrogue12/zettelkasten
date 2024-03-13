module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transformIgnorePatterns: ["/node_modules/(?!your-es6-package).+\\.js$"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "json", "vue"],
};
