import { pxToEm, pxToRem, vrEm, vrRem, msRem } from './functions';

describe('#pxToEm', () => {
	test('Should take negative pixel numbers and return equivalent values in ems', () => {
		expect(pxToEm(-16, 112.5)).toBe('-0.889em');
		expect(pxToEm(-16, 100)).toBe('-1em');
		expect(pxToEm(-8.5, 100)).toBe('-0.531em');
		expect(pxToEm(-8.5, 112.5)).toBe('-0.472em');
		expect(pxToEm(-0, 112.5)).toBe('0em');
		expect(pxToEm(-0, 100)).toBe('0em');
	});
	test('Should take positive pixel numbers and return equivalent values in ems', () => {
		expect(pxToEm(16, 112.5)).toBe('0.889em');
		expect(pxToEm(16, 100)).toBe('1em');
		expect(pxToEm(8.5, 100)).toBe('0.531em');
		expect(pxToEm(8.5, 112.5)).toBe('0.472em');
		expect(pxToEm(0, 112.5)).toBe('0em');
		expect(pxToEm(0, 100)).toBe('0em');
	});
});

describe('#pxToRem', () => {
	test('Should take negative pixel numbers and return equivalent values in rems', () => {
		expect(pxToRem(-16, 112.5)).toBe('-0.889rem');
		expect(pxToRem(-16, 100)).toBe('-1rem');
		expect(pxToRem(-8.5, 100)).toBe('-0.531rem');
		expect(pxToRem(-8.5, 112.5)).toBe('-0.472rem');
		expect(pxToRem(-0, 112.5)).toBe('0rem');
		expect(pxToRem(-0, 100)).toBe('0rem');
	});
	test('Should take positive pixel numbers and return equivalent values in rems', () => {
		expect(pxToRem(16, 112.5)).toBe('0.889rem');
		expect(pxToRem(16, 100)).toBe('1rem');
		expect(pxToRem(8.5, 100)).toBe('0.531rem');
		expect(pxToRem(8.5, 112.5)).toBe('0.472rem');
		expect(pxToRem(0, 112.5)).toBe('0rem');
		expect(pxToRem(0, 100)).toBe('0rem');
	});
});

describe('#vrEm', () => {
	test('Should return a multiple of the ratio in em units', () => {
		expect(vrEm(0.5, 1.3)).toBe('0.65em');
		expect(vrEm(1, 1)).toBe('1em');
		expect(vrEm(1.5, 1.3)).toBe('1.95em');
		expect(vrEm(2, 1)).toBe('2em');
		expect(vrEm(0, 1)).toBe('0em');
	});
});

describe('#vrRem', () => {
	test('Should return a multiple of the ratio in rem units', () => {
		expect(vrRem(0.5, 1.3)).toBe('0.65rem');
		expect(vrRem(1, 1)).toBe('1rem');
		expect(vrRem(1.5, 1.3)).toBe('1.95rem');
		expect(vrRem(2, 1)).toBe('2rem');
		expect(vrRem(0, 1)).toBe('0rem');
	});
});

describe('#msRem', () => {
	test('Should return 1rem when step is 0, no matter the ratio', () => {
		expect(msRem(0, 1)).toBe('1rem');
		expect(msRem(0, 1.5)).toBe('1rem');
		expect(msRem(0, 2)).toBe('1rem');
	});
	test('Should return font-sizes in rem units derived from a modular scale', () => {
		expect(msRem(1, 1.5)).toBe('1.5rem');
		expect(msRem(2, 1.5)).toBe('2.25rem');
		expect(msRem(3, 2)).toBe('8rem');
	});
});