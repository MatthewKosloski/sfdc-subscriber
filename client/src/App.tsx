import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import Container from './design-system/layout/container';
import { Row, Column } from './design-system/layout/grid';
import theme from './theme';

import GlobalStyle from './components/GlobalStyle';

import atoms from './design-system/components/atoms';
import organisms from './design-system/components/organisms';

const { Button, Label, TextInput, Badge } = atoms;
const { Card } = organisms;


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
							<Row>
								<Column>
									<Button small transparent>Normal</Button>
									<Button variant="primary" small>Primary</Button>
									<Button variant="danger" small outline>Danger</Button>
									<Button variant="dangerLight" small>Danger (Light)</Button>
									<Button variant="success" small>Success</Button>
									<Button variant="successLight" small>Success (Light)</Button>
								</Column>
							</Row>
						</Column>
					</Row>
					<Row>
						<Column sizes={[['XS', 12], ['SM', 6]]}>
							<h2>Forms</h2>
							<Label htmlFor="foo">Enter Name</Label>
							<TextInput id="foo"></TextInput>
						</Column>
						<Column sizes={[['XS', 12], ['SM', 6]]}>
							<h2>Cards</h2>
							<Card
								title="Card Title"
								subtitle="Subtitle"
								sideHeaderComponent={<p style={{margin: 0}}>Side Header Component</p>}
								footerComponent={<p style={{margin: 0}}>I am in the footer</p>}>
								<p style={{margin: 0}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique necessitatibus illum eaque dolorem quo aliquam?</p>
							</Card>
						</Column>
					</Row>
				</Container>
			</ThemeProvider>
		</Fragment>
	);
};

export default App;