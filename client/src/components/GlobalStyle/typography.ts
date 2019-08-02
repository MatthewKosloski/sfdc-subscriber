import { initRootType, fluidType, spacingRem } from '../../design-system/abstracts';
import { neutralBlack, primaryFontFamily } from '../../design-system/theme';

export default `
	html {
		${initRootType()}
		font-family: ${primaryFontFamily};
		color: ${neutralBlack};
	}

	h1,
	.h1 {
		${fluidType(3, 3)};
	}

	h2,
	.h2 {
		${fluidType(2, 2)};
	}

	h3,
	.h3 {
		${fluidType(1, 1)};
	}

	h4,
	.h4 {
		${fluidType(1, 1)};
	}

	h1, h2, h3, h4,
	.h1, .h2, .h3, .h4 {
		font-weight: 700;
	}

	h1, h2, h3, h4,
	.h1, .h2, .h3, .h4,
	p, li {
		${spacingRem(['MB'], 'One')};
	}

	ul,
	ol {
		${spacingRem(['PL', 'MB'], 'Two')};
	}
`;