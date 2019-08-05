import React from 'react';

import { Button } from '../../../design-system/components';

import { CardListItem } from '../../molecules';

interface ISubscriptionProps {
	eventApiName: string,
	onUnsubscribeClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
	minuteDuration?: number,
	color?: string
}

const Subscription: React.FC<ISubscriptionProps> = ({ eventApiName, minuteDuration, 
	onUnsubscribeClick, color }) => (
	<CardListItem
		titleText={eventApiName}
		subtitleText={`for ${minuteDuration} minutes`}
		borderLeftColor={color}>
		<Button
			variant="danger"
			onClick={onUnsubscribeClick}
			small>
			Unsubscribe
		</Button>
	</CardListItem>
);

Subscription.defaultProps = {
	minuteDuration: 0,
	color: '#fff'
};

export default Subscription;