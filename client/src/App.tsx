import React from 'react';

import Container from './design-system/layout/container';
import { Row, Column } from './design-system/layout/grid';

const App: React.FC = () => {
	return(
		<Container>
			<Row>
				<Column sizes={[['XS', 12], ['SM', 6]]}>
					<p>Hello world!</p>
				</Column>
				<Column sizes={[['XS', 12], ['SM', 6]]}>
					<p>Hello world!</p>
				</Column>
			</Row>
		</Container>
	);
};

export default App;