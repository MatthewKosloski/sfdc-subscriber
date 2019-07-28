export enum Breakpoint {
	XS = 0,
	SM = 500,
	MD = 768,
	LG = 1000,
	XL = 1280
}

export type BreakpointStrings = keyof typeof Breakpoint;
export type ColumnWidths = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColumnSizes = [BreakpointStrings, ColumnWidths][];

export const containerWidth: string = '100%';