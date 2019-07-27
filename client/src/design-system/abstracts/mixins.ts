import { msRem, vrEm, vrRem, round } from '../abstracts/functions';
import layout, { Breakpoint, Breakpoints } from '../theme/layout';
import spacing, { Step, StepsObject, ShorthandsObject } from '../theme/spacing';
import typography from '../theme/typography';

const { ratios, fontSizes } = typography;

/* Public API */

export function breakpoint(breakpoint: Breakpoint, 
	breakpoints: Breakpoints = layout.breakpoints): string {

	const css: string = `@media (min-width: ${breakpoints[breakpoint]})`;
	return css;
};

export function fluidType(minStep: number, maxStep: number, ratioXs: number, 
	ratioLg: number, minVw: string, maxVw: string): string {

	const minFontSize: string = msRem(minStep, ratioXs);
	const maxFontSize: string = msRem(maxStep, ratioLg);
	let css = _fluid(['font-size'], minFontSize, maxFontSize, minVw, maxVw);
	return css;
};

export function spacingEm(shorthands: Breakpoint[], stepXs: Step, stepLg: Step = stepXs, 
	isImportant: boolean = false, isNegative: boolean = false, ratioXs: number = ratios.xs,
	ratioLg: number = ratios.lg, shorthandsObj: ShorthandsObject = spacing.shorthands, 
	stepsObj: StepsObject = spacing.steps): string {

	const isEm = true;
	return _spacing(shorthands, stepXs, stepLg, ratioXs, ratioLg, shorthandsObj, 
		stepsObj, isEm, isImportant, isNegative);
}

export function spacingRem(shorthands: Breakpoint[], stepXs: Step, stepLg: Step = stepXs, 
	isImportant: boolean = false, isNegative: boolean = false, ratioXs: number = ratios.xs,
	ratioLg: number = ratios.lg, shorthandsObj: ShorthandsObject = spacing.shorthands, 
	stepsObj: StepsObject = spacing.steps): string {
		
	const isEm = false;
	return _spacing(shorthands, stepXs, stepLg, ratioXs, ratioLg, shorthandsObj, 
		stepsObj, isEm, isImportant, isNegative);
}

/* Private Methods */

function _setCSSProperty(property: string, value: any, isNegative: boolean = false,
isImportant: boolean = false): string {

	const prefix: string = isNegative ? '-' : '';
	const postfix: string = isImportant ? ' !important' : '';
	const semicolon: string = ';';
	const css: string = `${property}: ${prefix}${value}${postfix}${semicolon}`;
	return css;
};

function _setCSSProperties(properties: string[], value: any, 
	isNegative: boolean = false, isImportant: boolean = false): string {

	let css: string = '';
	properties.forEach((property) => {
		css += _setCSSProperty(property, value, isNegative, isImportant);
	});
	return css;
};

function _fluidCalc(minValue: string, maxValue: string, minVw: string, 
	maxVw: string): string {

	const minValueNum: number = parseFloat(minValue);
	const maxValueNum: number = parseFloat(maxValue);
	const minVwNum: number = parseFloat(minVw);
	const maxVwNum: number = parseFloat(maxVw);

	const valueDiff: number = round(maxValueNum - minValueNum, 4);
	const vwDiff: number = round(maxVwNum - minVwNum, 4);

	let css: string = `calc(`;
	css += `${minValue} + ${valueDiff} * (100vw - ${minVw}) / ${vwDiff}`;
	css += `)`;
	return css;
};

function _fluid(properties: string[], minValue: string, maxValue: string, 
	minVw: string, maxVw: string): string {

	const fluidValue = _fluidCalc(minValue, maxValue, minVw, maxVw);
	let css = '';
	css += _setCSSProperties(properties, minValue);
	css += `${breakpoint('sm')} {`;
	css += _setCSSProperties(properties, fluidValue);
	css += `}`;
	css += `${breakpoint('lg')} {`;
	css += _setCSSProperties(properties, maxValue);
	css += `}`;
	return css;
};

function _responsiveVr(properties: string[], stepXs: number, stepLg: number, ratioXs: number, 
	ratioLg: number, isEm: boolean = false, isNegative: boolean = false, 
	isImportant: boolean = false): string {

	const valueXs: string = isEm 
		? vrEm(stepXs, ratioXs) 
		: vrRem(stepXs, ratioXs);
	
	const valueLg: string = isEm 
		? vrEm(stepLg, ratioLg) 
		: vrRem(stepLg, ratioLg);

	let css = _setCSSProperties(properties, valueXs, isNegative, isImportant);
	css += `${breakpoint('lg')} {`;
	css += _setCSSProperties(properties, valueLg, isNegative, isImportant);
	css += `}`;
	return css;
}

function _responsiveVrEm(properties: string[], stepXs: number, stepLg: number, ratioXs: number, 
	ratioLg: number, isNegative: boolean = false, isImportant: boolean = false): string {
		
	const isEm: boolean = true;
	const css: string = _responsiveVr(properties, stepXs, stepLg, ratioXs, 
		ratioLg, isEm, isNegative, isImportant);
	return css;
}

function _responsiveVrRem(properties: string[], stepXs: number, stepLg: number, ratioXs: number, 
	ratioLg: number, isNegative: boolean = false, isImportant: boolean = false): string {
		
	const isEm: boolean = false;
	const css: string = _responsiveVr(properties, stepXs, stepLg, ratioXs, 
		ratioLg, isEm, isNegative, isImportant);
	return css;
}

// function _joinObjectKeys<TObj, TKey>(obj: TObj, keys: TKey[]): any[] {
function _joinObjectKeys(obj: any, keys: any[]): any[] {
	return keys
		.map((key) => {
			const objVal: any = obj[key];
			return objVal instanceof Array ? objVal : [objVal];
		})
		.reduce((a, b) => a.concat(b));
}


function _spacing(shorthands: Breakpoint[], stepXs: Step, stepLg: Step = stepXs,
	ratioXs: number, ratioLg: number, shorthandsObj: ShorthandsObject, 
	stepsObj: StepsObject, isEm: boolean = false, isImportant: boolean = false,
	isNegative: boolean = false): string {

	const props: any[] = _joinObjectKeys(shorthandsObj, shorthands);

	const stepXsNum: number = stepsObj[stepXs];
	const stepLgNum: number = stepsObj[stepLg];

	let css: string = isEm
		? _responsiveVrEm(props, stepXsNum, stepLgNum, ratioXs, ratioLg, isNegative, isImportant)
		: _responsiveVrRem(props, stepXsNum, stepLgNum, ratioXs, ratioLg, isNegative, isImportant);
	return css;
}