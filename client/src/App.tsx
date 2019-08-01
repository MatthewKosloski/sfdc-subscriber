import React, { Fragment, Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { Row, Column } from './design-system/layout';
import { GlobalStyle, Header, Main, TimelineCard } from './components';
import theme from './theme';

class App extends Component {

	render() {
		return(
			<Fragment>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<Fragment>
						<Header title="SFDC Subscriber"/>
						<div className="u-display-flex">
							<Main>
								<Row style={{minHeight: '60vh'}}>
									<Column>
										<TimelineCard />
									</Column>
								</Row>
							</Main>
						</div>
					</Fragment>
				</ThemeProvider>
			</Fragment>
		);
	}

}

export default App;