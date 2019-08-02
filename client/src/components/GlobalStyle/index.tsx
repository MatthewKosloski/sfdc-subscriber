import { createGlobalStyle } from 'styled-components';

import reset from './reset';
import utils from './utils';
import body from './body';
import typography from './typography';

const GlobalStyle = createGlobalStyle`
	${reset}
	${utils}
	${body}
	${typography}
`;

export default GlobalStyle;