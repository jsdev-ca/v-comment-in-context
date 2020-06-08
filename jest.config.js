// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!node_modules/**'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ],
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  }
};
