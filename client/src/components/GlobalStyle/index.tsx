import { createGlobalStyle } from 'styled-components';

import reset from './reset';
import typography from './typography';

const GlobalStyle = createGlobalStyle`
	${reset}
	${typography}
`;

export default GlobalStyle;