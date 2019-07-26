import { breakpoint, fluidType } from './mixins';
import { Breakpoint } from '../theme/layout';

describe('#breakpoint', () => {

	const breakpoints = {
		xs: '0px',
		sm: '10px',
		md: '100px',
		lg: '1000px',
		xl: '10000px'
	};

	test('Should return a breakpoint', () => {
		Object.keys(breakpoints).forEach((value) => {
			const bp = value as Breakpoint;
			expect(breakpoint(bp, breakpoints)).toBe(`@media (min-width: ${breakpoints[bp]})`);
		});
	});
});

describe('#fluidType', () => {
	test('Should pass', () => {
		expect(fluidType(4, 4, 1.2, 1.3, '31.250rem', '62.5rem')).toBe(false);
	});
});