import React, { FunctionComponent } from 'react';

import Container from './Container';
import Text from './Text';

interface Props {
	circleColor: string
}

const LegendItem: FunctionComponent<Props> = ({children, circleColor}) => (
	<Container circleColor={circleColor}>
		<Text>{children}</Text>
	</Container>
);

export default LegendItem;