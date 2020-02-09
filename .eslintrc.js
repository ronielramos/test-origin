module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'camelcase': 'off',
    '@typescript-eslint/camelcase': 'off',
  }
}
