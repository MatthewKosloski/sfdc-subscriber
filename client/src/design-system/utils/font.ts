import { primaryFontFamily } from '../theme';

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

	.u-font-left {
		text-align: left !important;
	}

	.u-font-center {
		text-align: center !important;
	}

	.u-font-right {
		text-align: right !important;
	}

`;