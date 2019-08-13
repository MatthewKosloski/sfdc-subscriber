import {
	Subscription,
	ADD_SUBSCRIPTION,
	REMOVE_SUBSCRIPTION,
	SUBSCRIPTION_REQUEST,
	SubscriptionActionTypes,
	UNSUBSCRIPTION_REQUEST
} from './types';

import SocketEvents from '../../../../../common/socketEvents';

const {
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST
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

export const unsubscriptionRequest = (eventApiName: string): SubscriptionActionTypes => ({
	type: UNSUBSCRIPTION_REQUEST,
	meta: {
		socket: {
			event: PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST,
			payload: {
				cometdChannel: `/event/${eventApiName}`
			}
		}
	}
});