import React from 'react';

import { Card } from '../../../design-system/components';

import Container from './Container';
import SubscriptionsCounter from './SubscriptionsCounter';
import SubscriptionForm from './SubscriptionForm';

interface ISubscriptionsCard {}

const SubscriptionsCard: React.FC<ISubscriptionsCard> = () => (
	<Container>
		<Card
			titleText="Subscriptions"
			sideHeaderComponent={<SubscriptionsCounter />}
			footerComponent={<SubscriptionForm />}
			constrictBodyHeight
			noPaddedBody>
			<p className="u-m-zero">Subscriptions list here</p>
		</Card>
	</Container>
);

export default SubscriptionsCard;