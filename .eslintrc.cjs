/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const path = require('path');

module.exports = {
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'react-refresh'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      excludedFiles: ['vite.config.ts'],

      extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            trailingComma: 'es5',
            semi: false,
            useTabs: false,
            singleQuote: true,
            quoteProps: 'consistent',
            bracketSpacing: true,
            arrowParens: 'always',
            printWidth: 150,
          },
        ],

        'no-tabs': 'error',

        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
            leadingUnderscore: 'allow',
          },
        ],

        'no-constant-condition': 'off',

        '@typescript-eslint/no-non-null-assertion': 'off',

        '@typescript-eslint/explicit-member-accessibility': 'off',

        '@typescript-eslint/no-unsafe-call': 'warn',

        '@typescript-eslint/no-unsafe-member-access': 'warn',

        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        'no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        'no-mixed-operators': 'error',

        '@typescript-eslint/no-empty-interface': 'off',
      },

      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
      },
    },
  ],
};
