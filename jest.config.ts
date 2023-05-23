import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/modules/users/application/use-cases/**/*.ts'],
  coverageDirectory: './coverage',
  rootDir: './',
  coverageThreshold: {
    global: {
      branches: 79,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  roots: ['<rootDir>', 'src'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  // preset: '@ms8/jest-testcontainers-mysql',
  preset: 'ts-jest',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  verbose: false,
  watchPlugins: [],
  bail: 0,
};

export default config;