import { Config } from 'jest';

export default {
	rootDir: '.',
	roots: ['<rootDir>/tests/__unit__'],
	displayName: 'Unit test',
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: './coverage',
	clearMocks: true,
	verbose: true,
	detectOpenHandles: true,
	testEnvironment: 'node',
	moduleNameMapper: {
		'#/(.+)': '<rootDir>/tests/$1',
		'@/(.+)': '<rootDir>/src/$1',
	},
} as Config;
