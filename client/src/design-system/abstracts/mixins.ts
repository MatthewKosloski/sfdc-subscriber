/*
const breakpoint = (breakpoint) => {
    return (rawStrings) => {
      return rawStrings[0]
          .trim()
          .split('\n')
          .map(prop => prop.trim());
    };
};
*/
import { msRem } from '../abstracts/functions';
import layout, { Breakpoint, Breakpoints } from '../theme/layout';

export const breakpoint = (
	breakpoint: Breakpoint,
	breakpoints: Breakpoints = layout.breakpoints
): string => {
	const css = `@media (min-width: ${breakpoints[breakpoint]})`;
	return css;
};

const _setCSSProperty = (
	property: string,
	value: any,
	isNegative: boolean = false,
	isImportant: boolean = false
): string => {
	const prefix = isNegative ? '-' : '';
	const postfix = isImportant ? ' !important' : '';
	const semicolon = ';';
	const css = `${property}: ${prefix}${value}${postfix}${semicolon}`;
	return css;
};

const _setCSSProperties = (
	properties: string[],
	value: any,
	isNegative: boolean = false,
	isImportant: boolean = false
): string => {
	let css = '';
	properties.forEach((property) => {
		css += _setCSSProperty(property, value, isNegative, isImportant);
	});
	return css;
};

const _fluidCalc = (
	minValue: number,
	maxValue: number,
	minVw: number,
	maxVw: number
): string => {
	const valueDiff = maxValue - minValue;
	const vwDiff = maxVw - minVw;

	let css = `calc(`;
	css += `${minValue} + ${valueDiff} * (100vw - ${minVw}) / ${vwDiff}`;
	css += `)`;
	return css;
};

const _fluid = (
	properties: string[],
	minValue: number,
	maxValue: number,
	minVw: number,
	maxVw: number
): string => {
	const fluidValue = _fluidCalc(minValue, maxValue, minVw, maxVw);
	let css = '';
	css += _setCSSProperties(properties, minValue);
	css += `${breakpoint('sm')} {`;
	css += _setCSSProperties(properties, fluidValue);
	css += `}`;
	css += `${breakpoint('lg')} {`;
	css += _setCSSProperties(properties, fluidValue);
	css += `}`;
	return css;
};


export const fluidType = (
	minStep: number,
	maxStep: number,
	ratioXs: number,
	ratioLg: number,
	minVw: number,
	maxVw: number
): string => {
	const minFontSize = msRem(minStep, ratioXs);
	const maxFontSize = msRem(maxStep, ratioLg);
	return _fluid(['font-size'], minFontSize, maxFontSize, minVw, maxVw);
};