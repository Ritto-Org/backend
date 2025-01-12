import { type Config } from 'jest';

import jestConfig from './jest.config';

export default {
	...jestConfig,
	roots: ['<rootDir>/tests/__e2e__'],
	rootDir: '.',
	displayName: 'E2E Test',
	testRegex: '.*\\.e2e-spec\\.ts$',
} as Config;
