import theme from '../theme/';

const { primaryFontFamily } = theme.typography;

export default `
	.u-font-light {
		font-weight: 300 !important;
	}

	.u-font-normal {
		font-weight: 400 !important;
	}

	.u-font-heavy {
		font-weight: 700 !important;
	}

	.u-font-primary {
		font-family: ${primaryFontFamily} !important;
	}
`;