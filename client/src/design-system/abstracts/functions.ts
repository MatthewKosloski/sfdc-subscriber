/* Public API */

/**
 * Rounds a number to a certain precision.
 * 
 * @param num The number to round.
 * @param precision The number of digits that appear after 
 * the decimal.
 * 
 * @example
 * 		round(3.141592, 2) -> 3.14
 * 
 */
export function round(num: number, precision: number = 2): number {
	return Number(num.toFixed(precision));
};

/**
 * Converts a numerical value of pixels to a string representation
 * in EM units.
 *
 * @param px A number, in pixels, to convert to EM units.
 * @param baseFontSize A percentage representing the base font-size.
 *
 * @example
 * 		pxToRem(8, 100) -> '0.5em'
 *
 */
export function pxToEm(px: number, baseFontSize: number = 100): string {
	return _em(_pxToRelativeUnit(px, baseFontSize));
};

/**
 * Converts a numerical value of pixels to a string representation
 * in REM units.  To learn more about vertical rhythm, see:
 * https://zellwk.com/blog/responsive-typography/
 *
 * @param px A number, in pixels, to convert to REM units.
 * @param baseFontSize A percentage representing the base font-size.
 *
 * @example
 * 		pxToRem(16, 100) -> '1rem'
 *
 */
export function pxToRem(px: number, baseFontSize: number = 100): string {
	return _rem(_pxToRelativeUnit(px, baseFontSize));
};

/**
 * Returns a multiple of ratio in EM units. Use this function
 * to produce sensible numbers for line-height, padding, margin, etc.
 * To learn more about vertical rhythm, see:
 * https://zellwk.com/blog/responsive-typography/
 *
 * @param multiplier
 * @param ratio
 *
 * @example
 * 		vrEm(2, 1.5) -> '3em'
 *
 */
export function vrEm(multiplier: number, ratio: number = 1.3): string {
	return _em(_vr(multiplier, ratio));
};

/**
 * Returns a multiple of ratio in REM units. Use this function
 * to produce sensible numbers for line-height, padding, margin, etc.
 *
 * @param multiplier
 * @param ratio
 *
 * @example
 * 		vrRem(2, 2) -> '4rem'
 *
 */
export function vrRem(multiplier: number, ratio: number = 1.3): string {
	return _rem(_vr(multiplier, ratio));
};

/**
 * Returns a font-size, in REM units, on the modular scale.
 * To learn more about modular scales, see:
 * https://www.modularscale.com/
 *
 * @param step The step on the modular scale.
 * @param ratio The ratio used to generate the modular scale.
 *
 * The following example returns 2.25rem, which is 2 steps on the
 * modular scale with a 1.5 ratio.
 * To see it in action, visit https://www.modularscale.com/?1&em&1.5.
 *
 * @example
 * 		msRem(2, 1.5) -> '2.25rem'
 *
 */
export function msRem(step: number, ratio: number = 1.3): string {
	return _rem(_ms(step, ratio));
};

/* Private Methods */

function _pxToRelativeUnit(px: number, baseFontSize: number): number {
	baseFontSize = (baseFontSize / 100) * 16;
	return round(px / baseFontSize, 4);
};

function _em(relativeUnit: number): string {
	return `${relativeUnit}em`;
};

function _rem(relativeUnit: number): string {
	return `${relativeUnit}rem`;
};

function _vr(multiplier: number, ratio: number): number {
	return round(multiplier * ratio, 4);
};

function _ms(step: number, ratio: number): number {
	return round(Math.pow(ratio, step), 4);
};