import React, { Fragment, FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, Dashboard } from './components';
import theme from './theme';

const App: FunctionComponent = () => (
	<Fragment>
		<GlobalStyle />
		<ThemeProvider theme={theme}>
			<Dashboard />
		</ThemeProvider>
	</Fragment>
);

export default App;