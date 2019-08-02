import React from 'react';

import { Card } from '../../../design-system/components';

import Container from './Container';

interface ITrendsCardProps {}

const TrendsCard: React.FC<ITrendsCardProps> = () => (
	<Container>
		<Card
			titleText="Trends"
			constrictBodyHeight>
			<p className="u-font-center u-m-zero u-align-center" style={{height: '100%'}}>
				No trend data available.
			</p>
		</Card>
	</Container>
);

export default TrendsCard;