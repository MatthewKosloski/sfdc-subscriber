export enum Shorthand {
	M = 'm',
	MX = 'mx',
	MY = 'my',
	MT = 'mt',
	MR = 'mr',
	MB = 'mb',
	ML = 'ml',

	P = 'p',
	PX = 'px',
	PY = 'py',
	PT = 'pt',
	PR = 'pr',
	PB = 'pb',
	PL = 'pl',
}

export enum Step {
	Zero = 'zero',
	Quarter = 'quarter',
	Half = 'half',
	ThreeFourths = 'threeFourths',
	One = 'one',
	Two = 'two',
	Three = 'three',
	Four = 'four',
	Five = 'five'
}

type Spacing = {
	shorthands: {
		[key in Shorthand]: string | string[]
	},
	steps: {
		[key in Step]: number
	}
}

const spacing: Spacing = {
	shorthands: {
		m: 'margin',
		mx: ['margin-left', 'margin-right'],
		my: ['margin-top', 'margin-bottom'],
		mt: 'margin-top',
		mr: 'margin-right',
		mb: 'margin-bottom',
		ml: 'margin-left',

		p: 'padding',
		px: ['padding-left', 'padding-right'],
		py: ['padding-top', 'padding-bottom'],
		pt: 'padding-top',
		pr: 'padding-right',
		pb: 'padding-bottom',
		pl: 'padding-left'
	},

	steps: {
		zero: 0,
		quarter: 0.25,
		half: 0.5,
		threeFourths: 0.75,
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5
	}
};

export default spacing;