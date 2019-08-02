import React from 'react';

import { Card } from '../../../design-system/components';

import { CardListItems } from '../';

import Container from './Container';
import Counter from './Counter';
import Form from './Form';
import CardListItem from './CardListItem';

interface ISubscriptionsCard {}

const SubscriptionsCard: React.FC<ISubscriptionsCard> = () => (
	<Container>
		<Card
			titleText="Subscriptions"
			sideHeaderComponent={<Counter />}
			footerComponent={<Form />}
			constrictBodyHeight
			noPaddedBody>
			<CardListItems>
				<CardListItem
					titleText="Product_License_Expiration__e"
					subtitleText="for 1 minute"
					borderLeftColor="rgba(43, 46, 106, 1)" />
				<CardListItem
					titleText="DataCenter_Exception__e"
					subtitleText="for 2 minutes"
					borderLeftColor="rgba(255, 193, 24, 1)" />
				<CardListItem
					titleText="DataCenter_Status_Change__e"
					subtitleText="for 9 minutes"
					borderLeftColor="rgba(0, 237, 188, 1)" />
				<CardListItem
					titleText="Client_Health_Change__e"
					subtitleText="for 12 minutes"
					borderLeftColor="rgba(149, 62, 189, 1)" />
			</CardListItems>
		</Card>
	</Container>
);

export default SubscriptionsCard;