type FontFamilies = 'primary';

type Typography = {
	ratios: {
		[key in 'xs' | 'lg']: number
	},
	fontSizes: {
		[key in 'xs' | 'lg']: number
	},
	fontFamilies: {
		[key in FontFamilies]: string
	}
};

const typography: Typography = {
	ratios: {
		xs: 1.2,
		lg: 1.3
	},

	fontSizes: {
		xs: 100,
		lg: 112.5
	},

	fontFamilies: {
		primary: "'Source Sans Pro', sans-serif"
	}
};

export default typography;