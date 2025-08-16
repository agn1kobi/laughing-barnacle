// Flat ESLint configuration for ESLint v9+
// Minimal setup for TS + Jest + Prettier-compatible rules
// See: https://eslint.org/docs/latest/use/configure/

/* eslint-disable @typescript-eslint/no-require-imports */
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const jestPlugin = require('eslint-plugin-jest');
const prettier = require('eslint-config-prettier');

module.exports = [
  // Ignore build artifacts
  { ignores: ['dist/**', 'node_modules/**'] },

  // Base JS recommended
  js.configs.recommended,

  // TypeScript recommended (no type-checking for speed)
  ...tseslint.configs.recommended,

  // Jest for test files
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'test/**/*.ts'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: {
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
        // Node globals
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      ...(jestPlugin.configs.recommended && jestPlugin.configs.recommended.rules
        ? jestPlugin.configs.recommended.rules
        : {}),
    },
  },

  // Turn off formatting-conflicting rules
  prettier,
];
