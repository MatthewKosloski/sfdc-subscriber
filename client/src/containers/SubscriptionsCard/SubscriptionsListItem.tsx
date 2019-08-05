import React from 'react';

import { Button } from '../../design-system/components';

import { CardListItem } from '../../components';

interface ISubscriptionsListItemProps {
	eventApiName: string,
	onUnsubscribeClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
	minuteDuration?: number,
	color?: string
}

const SubscriptionsListItem: React.FC<ISubscriptionsListItemProps> = ({ eventApiName, minuteDuration,
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

SubscriptionsListItem.defaultProps = {
	minuteDuration: 0,
	color: '#fff'
};

export default SubscriptionsListItem;