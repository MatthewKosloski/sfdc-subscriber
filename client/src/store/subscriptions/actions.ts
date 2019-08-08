import {
	Subscription,
	ADD_SUBSCRIPTION,
	REMOVE_SUBSCRIPTION,
	SUBSCRIPTION_REQUEST,
	AddSubscriptionAction,
	RemoveSubscriptionAction,
	SubscriptionRequestAction
} from './types';

import SocketEvents from '../../socketEvents';

import { addToastError } from '../toast/actions';

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

export const subscriptionRequest = (eventApiName: string): SubscriptionRequestAction => {

	const subscription: Subscription = {
		eventApiName,
		color: 'red',
		minuteDuration: 0
	};

	return {
		type: SUBSCRIPTION_REQUEST,
		meta: {
			socket: {
				event: SocketEvents.PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
				payload: {
					successAction: addSubscription(subscription),
					failureAction: addToastError(`Failed to subscribe to event ${eventApiName}. Make sure you entered in the correct API name.`),
					cometdChannel: `/event/${eventApiName}`
				}
			}
		}
	};
};