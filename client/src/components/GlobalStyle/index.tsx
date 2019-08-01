import { createGlobalStyle } from 'styled-components';

import reset from './reset';
import utils from './utils';
import typography from './typography';

const GlobalStyle = createGlobalStyle`
	${reset}
	${utils}
	${typography}
`;

export default GlobalStyle;