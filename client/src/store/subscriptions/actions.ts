import {
	Subscription,
	ADD_SUBSCRIPTION,
	REMOVE_SUBSCRIPTION,
	SUBSCRIPTION_REQUEST,
	AddSubscriptionAction,
	RemoveSubscriptionAction,
	SubscriptionRequestAction
} from './types';

import SocketEvents from '../../../../common/socketEvents';

const {
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST
} = SocketEvents;

export const addSubscription = (newSubscription: Subscription): AddSubscriptionAction => ({
	type: ADD_SUBSCRIPTION,
	payload: newSubscription
});

export const removeSubscription = (eventApiName: string): RemoveSubscriptionAction => ({
	type: REMOVE_SUBSCRIPTION,
	meta: {
		eventApiName
	}
});

export const subscriptionRequest = (eventApiName: string): SubscriptionRequestAction => ({
	type: SUBSCRIPTION_REQUEST,
	meta: {
		socket: {
			event: PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
			payload: {
				cometdChannel: `/event/${eventApiName}`
			}
		}
	}
});