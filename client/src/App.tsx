import React, { Fragment, Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { Row, Column } from './design-system/layout';
import { GlobalStyle, Header, Main, TimelineCard,
	SubscriptionsCard, TrendsCard, Sidebar } from './components';
import theme from './theme';

class App extends Component {

	render() {
		return(
			<Fragment>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<Fragment>
						<Header
							title="SFDC Subscriber" />
						<div
							className="u-display-flex">
							<Main>
								<Row
									style={{minHeight: '60vh'}}>
									<Column>
										<TimelineCard />
									</Column>
								</Row>
								<Row
									style={{minHeight: '40vh'}}>
									<Column
										sizes={[['XS', 12], ['LG', 6]]}
										className="u-pr-zero">
										<SubscriptionsCard />
									</Column>
									<Column
										sizes={[['XS', 12], ['LG', 6]]}>
										<TrendsCard />
									</Column>
								</Row>
							</Main>
							<Sidebar>
								<p>Sidebar children</p>
							</Sidebar>
						</div>
					</Fragment>
				</ThemeProvider>
			</Fragment>
		);
	}

}

export default App;