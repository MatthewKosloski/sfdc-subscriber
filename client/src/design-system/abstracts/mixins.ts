import { msRem, pxToEm, pxToRem, vrEmFunc, vrRemFunc, round } from './functions';
import { Breakpoint, BreakpointStrings, ColumnWidths, ColumnSizes } from '../theme/layout';
import { Step, Spacing, StepStrings, stepStringsArr, SpacingStrings,
	spacingStringsArr } from '../theme/spacing';
import buttonVariants, { IButtonProps } from '../theme/buttons';
import { neutralBlack } from '../theme/colors';
import typography from '../theme/typography';

import { Props as ToastProps } from '../components/atoms/Toast';

/* Public API */

/**
 * Outputs CSS at a width greater than or equal to the specified
 * breakpoint.
 *
 * @param shorthand The shortname of the breakpoint.
 * @param breakpoints An object of key-value pairs, where the key is
 * the breakpoint shorthand and the value is the breakpoint width.
 *
 * @example
 * styled.div`
 * 	${breakpoint('LG')} {
 * 		color: red
 * 	}
 * `;
 */
export function breakpoint(shorthand: BreakpointStrings): string {
	const breakpointRem: string = pxToRem(Breakpoint[shorthand]);
	const css: string = `@media (min-width: ${breakpointRem})`;
	return css;
};

/**
 * Adds fluid typography to an element.  To learn more about
 * fluid typography, see:
 * https://www.smashingmagazine.com/2016/05/fluid-typography/
 *
 * @param minStep The step on the modular scale for the minimum
 * font-size.
 * @param maxStep The step on the modular scale for the maximum
 * font-size.
 * @param ratioXs The modular scale ratio for the minimum font-size.
 * @param ratioLg The modular scale ratio for the maximum font-size.
 * @param minVw The width at which the font-size starts to scale.
 * @param maxVw The width at which the font-size stops scaling.
 *
 * The following example adds fluid typography to a level-1 heading
 * element.  On small
 *
 * @example
 * 	styled.h1`
 *    ${fluidType(2, 4)}
 *  `
 *
 */
export function fluidType(minStep: number, maxStep: number, ratioXs: number = typography.ratioXs,
	ratioLg: number = typography.ratioLg, minVw: string = pxToRem(Breakpoint.SM),
	maxVw: string = pxToRem(Breakpoint.LG)): string {

	const minFontSize: string = msRem(minStep, ratioXs);
	const maxFontSize: string = msRem(maxStep, ratioLg);
	const css: string = _fluid(['font-size'], minFontSize, maxFontSize, minVw, maxVw);
	return css;
};

export function spacingEm(shorthands: SpacingStrings[], stepXs: StepStrings,
	stepLg: StepStrings = stepXs, isImportant: boolean = false, isNegative: boolean = false,
	ratioXs: number = typography.ratioXs, ratioLg: number = typography.ratioLg): string {

	const isEm: boolean = true;
	const css: string = _spacing(shorthands, stepXs, stepLg, ratioXs, ratioLg,
		isEm, isImportant, isNegative);
	return css;
}

export function negativeSpacingEm(shorthands: SpacingStrings[], stepXs: StepStrings,
	stepLg: StepStrings = stepXs, isImportant: boolean = false,
	ratioXs: number = typography.ratioXs, ratioLg: number = typography.ratioLg): string {

	const isNegative: boolean = true;
	const isEm: boolean = true;
	const css: string = _spacing(shorthands, stepXs, stepLg, ratioXs, ratioLg,
		isEm, isImportant, isNegative);
	return css;
}

export function spacingRem(shorthands: SpacingStrings[], stepXs: StepStrings,
	stepLg: StepStrings = stepXs, isImportant: boolean = false, isNegative: boolean = false,
	ratioXs: number = typography.ratioXs, ratioLg: number = typography.ratioLg): string {

	const isEm: boolean = false;
	const css: string = _spacing(shorthands, stepXs, stepLg, ratioXs, ratioLg,
		isEm, isImportant, isNegative);
	return css;
}

export function negativeSpacingRem(shorthands: SpacingStrings[], stepXs: StepStrings,
	stepLg: StepStrings = stepXs, isImportant: boolean = false,
	ratioXs: number = typography.ratioXs, ratioLg: number = typography.ratioLg): string {

	const isNegative: boolean = true;
	const isEm: boolean = false;
	const css: string = _spacing(shorthands, stepXs, stepLg, ratioXs, ratioLg,
		isEm, isImportant, isNegative);
	return css;
}

export function initRootType(fontSizeXs: number = typography.fontSizeXs,
	fontSizeLg: number = typography.fontSizeLg, ratioXs: number = typography.ratioXs,
	ratioLg: number = typography.ratioLg): string {

	const css: string = `
		${_setCSSProperty('font-size', `${fontSizeXs}%`)}
		${_setCSSProperty('line-height', ratioXs)}

		${breakpoint('LG')} {
			${_setCSSProperty('font-size', `${fontSizeLg}%`)}
			${_setCSSProperty('line-height', ratioLg)}
		}
	`;

	return css;
}

export function flexColumn(shorthand: BreakpointStrings, columnWidth: ColumnWidths,
	totalColumns: number = 12) {
	const width: number = (columnWidth / totalColumns) * 100;
	const widthPercent: string = `${width}%`;
	const css: string = `
		${breakpoint(shorthand)} {
			flex: 1 0 ${widthPercent};
			max-width: ${widthPercent};
		}
	`;

	return css;
}

export function flexColumns(sizes: ColumnSizes) {
	let css: string = '';
	sizes.forEach((size) => {
		const shorthand: BreakpointStrings = size[0];
		const columnWidth: ColumnWidths = size[1];
		css += flexColumn(shorthand, columnWidth);
	});

	return css;
}

export function buttonVariant(props: IButtonProps, borderWidth: number = 1): string {

	let css: string = '';

	if(props.variant) {
		const {
			backgroundColor,
			backgroundColorHover,
			borderColorFocus,
			color
		} = buttonVariants[props.variant];

		if(props.outline) {
			css += `
				background-color: transparent;
				border: ${pxToEm(borderWidth)} solid ${backgroundColor};
				color: ${backgroundColor};
				&:hover:not(:disabled),
				&:focus:not(:disabled) {
					background-color: ${backgroundColor};
					color: ${color};
				}
			`;
		} else if(props.selected) {
			css += `
				background-color: ${backgroundColor};
				color: ${color};
			`;
		} else if(props.transparent) {
			css += `
				background-color: transparent;
				color: ${neutralBlack};
			`;
		} else {
			css += `
				background-color: ${backgroundColor};
				color: ${color};
				&:hover:not(:disabled),
				&:focus:not(:disabled) {
					background-color: ${backgroundColorHover};
				}
			`;
		}

		css += `
			&:focus:not(:disabled) {
				box-shadow: 0 0 0 ${pxToEm(3)} ${borderColorFocus};
			}
		`;
	}

	return css;
}

export function toastVariant(props: ToastProps): string {
	let css: string = '';

	if(props.variant) {
		const {
			backgroundColor
		} = buttonVariants[props.variant];

		css += `
			background-color: ${backgroundColor};
		`;

	}

	return css;
}

export function createSpacingUtilClasses(): string {
	let css: string = '';

	spacingStringsArr.forEach((spacingString) => {

		const spacingStringLowerCase: string = spacingString.toLowerCase();

		const prop: Spacing = Spacing[spacingString as SpacingStrings];
		css += `.u-${spacingStringLowerCase}-auto {
			${prop}: auto;
		}`;

		stepStringsArr.forEach((stepString) => {

			const stepStringLowerCase: string = stepString.toLowerCase();
			const shorthands: SpacingStrings[] = [spacingString as SpacingStrings];
			const stepXs: StepStrings = stepString as StepStrings;
			const stepXl: StepStrings = stepXs;
			const isImportant: boolean = true;

			css += `.u-${spacingStringLowerCase}-${stepStringLowerCase} {
				${spacingEm(shorthands, stepXs, stepXl, isImportant)}
			}`;

		});
	});

	return css;
}

export function dropdownButtonVariant(props: IButtonProps): string {
	let css: string = '';

	if(props.variant) {
		const {
			backgroundColor,
			color
		} = buttonVariants[props.variant];

		if(props.outline) {
			css += `
				svg {
					fill: ${backgroundColor};
				}
				&:hover:not(:disabled),
				&:focus:not(:disabled) {
					svg {
						fill: ${color};
					}
				}
			`;
		} else {
			css += `
				svg {
					fill: ${color};
				}
				&:hover:not(:disabled),
				&:focus:not(:disabled) {
					svg {
						fill: ${color};
					}
				}
			`;
		}
	}

	return css;
}

export function vrEm(properties: string[], stepXs: number, stepLg: number = stepXs,
	isNegative: boolean = false, isImportant: boolean = false, ratioXs: number = typography.ratioXs,
	ratioLg: number = typography.ratioLg): string {
	let css: string = '';
	css += _responsiveVrEm(properties, stepXs, stepLg, ratioXs, ratioLg, isNegative, isImportant);
	return css;
}

export function vrRem(properties: string[], stepXs: number, stepLg: number = stepXs,
	isNegative: boolean = false, isImportant: boolean = false, ratioXs: number = typography.ratioXs,
	ratioLg: number = typography.ratioLg): string {
	let css: string = '';
	css += _responsiveVrRem(properties, stepXs, stepLg, ratioXs, ratioLg, isNegative, isImportant);
	return css;
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

	const css: string = `calc(
		${minValue} + ${valueDiff} * (100vw - ${minVw}) / ${vwDiff}
	)`;

	return css;
};

function _fluid(properties: string[], minValue: string, maxValue: string,
	minVw: string, maxVw: string): string {

	const fluidValue: string = _fluidCalc(minValue, maxValue, minVw, maxVw);

	const css: string = `
		${_setCSSProperties(properties, minValue)}

		${breakpoint('SM')} {
			${_setCSSProperties(properties, fluidValue)}
		}

		${breakpoint('LG')} {
			${_setCSSProperties(properties, maxValue)}
		}
	`;

	return css;
};

function _responsiveVr(properties: string[], stepXs: number, stepLg: number, ratioXs: number,
	ratioLg: number, isEm: boolean = false, isNegative: boolean = false,
	isImportant: boolean = false): string {

	const valueXs: string = isEm
		? vrEmFunc(stepXs, ratioXs)
		: vrRemFunc(stepXs, ratioXs);

	const valueLg: string = isEm
		? vrEmFunc(stepLg, ratioLg)
		: vrRemFunc(stepLg, ratioLg);

	const css: string = `
		${_setCSSProperties(properties, valueXs, isNegative, isImportant)}

		${breakpoint('LG')} {
			${_setCSSProperties(properties, valueLg, isNegative, isImportant)}
		}
	`;

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

function _spacing(shorthands: SpacingStrings[], stepXs: StepStrings, stepLg: StepStrings = stepXs,
	ratioXs: number, ratioLg: number, isEm: boolean = false, isImportant: boolean = false,
	isNegative: boolean = false): string {

	const props: Spacing[] = shorthands.map((shorthand) => Spacing[shorthand]);

	const stepXsNum: number = Step[stepXs];
	const stepLgNum: number = Step[stepLg];

	let css: string = isEm
		? _responsiveVrEm(props, stepXsNum, stepLgNum, ratioXs, ratioLg, isNegative, isImportant)
		: _responsiveVrRem(props, stepXsNum, stepLgNum, ratioXs, ratioLg, isNegative, isImportant);
	return css;
}