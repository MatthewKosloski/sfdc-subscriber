import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import Container from './design-system/layout/container';
import { Row, Column } from './design-system/layout/grid';
import Badge from './design-system/components/atoms/Badge';
import theme from './theme';

import GlobalStyle from './components/GlobalStyle';

const App: React.FC = () => {
	return(
		<Fragment>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Container>
					<Row>
						<Column sizes={[['XS', 12], ['SM', 6]]}>
							<h2>Badges</h2>
							<Row>
								<Column>
									<Badge small>Normal</Badge>
									<Badge variant="primary" small>Primary</Badge>
									<Badge variant="danger" small>Danger</Badge>
									<Badge variant="dangerLight" small>Danger (Light)</Badge>
									<Badge variant="success" small>Success</Badge>
									<Badge variant="successLight" small>Success (Light)</Badge>
								</Column>
							</Row>
						</Column>
						<Column sizes={[['XS', 12], ['SM', 6]]}>
							<h2>Buttons</h2>
						</Column>
					</Row>
				</Container>
			</ThemeProvider>
		</Fragment>
	);
};

export default App;