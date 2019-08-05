import React from 'react';

import { Card } from '../../../design-system/components';

import { CardListItems as TrendsList, DataContainer } from '../';

import TrendsListItem from './TrendsListItem';
import Container from './Container';

interface ITrendsCardProps {}

const TrendsCard: React.FC<ITrendsCardProps> = () => (
	<Container>
		<Card
			titleText="Trends"
			fullBodyHeight
			noPaddedBody>
			<DataContainer
				hasData={false}
				noDataText="No trend data available.">
				<TrendsList>
					<TrendsListItem
						titleText="DataCenter_Exception__e"
						subtitleText="since 0 minutes ago"
						borderLeftColor="rgba(255, 193, 24, 1)"
						trendCount="23" />
					<TrendsListItem
						titleText="DataCenter_Status_Change__e"
						subtitleText="since 9 minutes ago"
						borderLeftColor="rgba(0, 237, 188, 1)"
						trendCount="6"
						uptrend={false} />
				</TrendsList>
			</DataContainer>
		</Card>
	</Container>
);

export default TrendsCard;