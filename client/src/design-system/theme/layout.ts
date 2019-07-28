export enum Breakpoint {
	XS = 0,
	SM = 500,
	MD = 768,
	LG = 1000,
	XL = 1280
}

export type BreakpointStrings = keyof typeof Breakpoint;