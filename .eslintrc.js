module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  ignorePatterns: ['*/dist/*'],
  env: {
    'jest/globals': true
  },
  rules: {
    semi: ['error', 'always'],
    'no-debugger': 'off',
    'jest/no-test-callback': 'off'
  },
  extends: [
    'standard',
    'plugin:jest/all'
  ],
  plugins: ['jest']
};
