import React from 'react';

import { Card } from '../../../design-system/components';

import TrendBadgeNegative from './TrendBadgeNegative';
import TrendBadgePositive from './TrendBadgePositive';

import Container from './Container';

interface ITrendsCardProps {}

const TrendsCard: React.FC<ITrendsCardProps> = () => (
	<Container>
		<Card
			titleText="Trends"
			constrictBodyHeight>
			<TrendBadgePositive count="12"/>
			<TrendBadgeNegative count="125" />
		</Card>
	</Container>
);

export default TrendsCard;