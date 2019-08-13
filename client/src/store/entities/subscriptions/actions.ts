import {
	Subscription,
	ADD_SUBSCRIPTION,
	REMOVE_SUBSCRIPTION,
	SUBSCRIPTION_REQUEST,
	SubscriptionActionTypes
} from './types';

import SocketEvents from '../../../../../common/socketEvents';

const {
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST
} = SocketEvents;

export const addSubscription = (newSubscription: Subscription): SubscriptionActionTypes => ({
	type: ADD_SUBSCRIPTION,
	payload: newSubscription
});

export const removeSubscription = (id: string): SubscriptionActionTypes => ({
	type: REMOVE_SUBSCRIPTION,
	meta: {
		id
	}
});

export const subscriptionRequest = (eventApiName: string): SubscriptionActionTypes => ({
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