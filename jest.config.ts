/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@queue/(.*)$': '<rootDir>/src/queue/$1',
    '^@tests/(.*)$': '<rootDir>/test/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
          parser: { syntax: 'typescript', tsx: false, decorators: true },
          transform: { decoratorMetadata: true },
        },
        module: { type: 'commonjs' },
        sourceMaps: 'inline',
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[tj]s?(x)'],
  globalSetup: './test/jest.global.setup.ts',
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
};

export default config;
