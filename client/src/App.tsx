import React from 'react';

import Container from './design-system/layout/container';
import { Row, Column } from './design-system/layout/grid';

import Badge from './design-system/components/atoms/badge';

const App: React.FC = () => {
	return(
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
	);
};

export default App;