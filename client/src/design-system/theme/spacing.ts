export enum Spacing {
	M = 'margin',
	MT = 'margin-top',
	MR = 'margin-right',
	MB = 'margin-bottom',
	ML = 'margin-left',

	P = 'padding',
	PT = 'padding-top',
	PR = 'padding-right',
	PB = 'padding-bottom',
	PL = 'padding-left'
}

export enum Step {
	Zero = 0,
	Quarter = 0.25,
	Half = 0.5,
	ThreeFourths = 0.75,
	One = 1,
	Two = 2,
	Three = 3,
	Four = 4,
	Five = 5
}


export type SpacingStrings = keyof typeof Spacing;
export const spacingStringsArr: string[] = Object.keys(Spacing);

export type StepStrings = keyof typeof Step;
export const stepStringsArr: string[] = Object.values(Step)
	.filter((value) => typeof value === 'string') as string[];