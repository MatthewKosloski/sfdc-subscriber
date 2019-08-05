import React from 'react';

import { Card } from '../../../design-system/components';

import { CardListItems as SubscriptionsList } from '../';

import Container from './Container';
import Counter from './Counter';
import Form from './Form';
import Subscription from './Subscription';

interface ISubscriptionsCard {}

const SubscriptionsCard: React.FC<ISubscriptionsCard> = () => (
	<Container>
		<Card
			titleText="Subscriptions"
			sideHeaderComponent={<Counter count={54}/>}
			footerComponent={<Form onSubmit={(e) => {
				console.log('handle form submit');
				e.preventDefault();
			}}/>}
			constrictBodyHeight
			noPaddedBody>
			<SubscriptionsList>
				<Subscription
					eventApiName="Product_License_Expiration__e"
					minuteDuration={1}
					color="rgba(43, 46, 106, 1)"
					onUnsubscribeClick={() => console.log('Product_License_Expiration__e')} />
				<Subscription
					eventApiName="DataCenter_Exception__e"
					minuteDuration={2}
					color="rgba(255, 193, 24, 1)"
					onUnsubscribeClick={() => console.log('DataCenter_Exception__e')} />
				<Subscription
					eventApiName="DataCenter_Status_Change__e"
					minuteDuration={9}
					color="rgba(0, 237, 188, 1)"
					onUnsubscribeClick={() => console.log('DataCenter_Status_Change__e')} />
				<Subscription
					eventApiName="Client_Health_Change__e"
					minuteDuration={12}
					color="rgba(149, 62, 189, 1)"
					onUnsubscribeClick={() => console.log('Client_Health_Change__e')} />
			</SubscriptionsList>
		</Card>
	</Container>
);

export default SubscriptionsCard;