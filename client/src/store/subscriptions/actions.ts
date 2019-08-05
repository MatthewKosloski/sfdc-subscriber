import { Subscription, ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTION, SubscriptionActionTypes } from './types';

export const addSubscription = (newSubscription: Subscription): SubscriptionActionTypes => ({
	type: ADD_SUBSCRIPTION,
	payload: newSubscription
});

export const removeSubscription = (eventApiName: string): SubscriptionActionTypes => ({
	type: REMOVE_SUBSCRIPTION,
	meta: {
		eventApiName
	}
});