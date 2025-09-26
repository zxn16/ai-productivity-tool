/* eslint-env node */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    // React
    'react/react-in-jsx-scope': 'off', // No need for React import in JSX (React 17+)

    // Formatting
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],

    // Optional clean code rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],

    // You can add more custom rules here
  },
};
