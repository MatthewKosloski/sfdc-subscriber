import React from 'react';

import { Card } from '../../../design-system/components';

import { CardListItems as TrendsCardListItems } from '../';
import TrendsCardListItem from './TrendsCardListItem';

import Container from './Container';

interface ITrendsCardProps {}

const TrendsCard: React.FC<ITrendsCardProps> = () => (
	<Container>
		<Card
			titleText="Trends"
			fullBodyHeight
			noPaddedBody>
			<TrendsCardListItems>
				<TrendsCardListItem
					titleText="DataCenter_Exception__e"
					subtitleText="since 0 minutes ago"
					borderLeftColor="rgba(255, 193, 24, 1)"
					trendCount="23" />
				<TrendsCardListItem
					titleText="DataCenter_Status_Change__e"
					subtitleText="since 9 minutes ago"
					borderLeftColor="rgba(0, 237, 188, 1)"
					trendCount="6"
					uptrend={false} />
			</TrendsCardListItems>
		</Card>
	</Container>
);

export default TrendsCard;