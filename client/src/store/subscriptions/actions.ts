import {
	Subscription,
	ADD_SUBSCRIPTION,
	REMOVE_SUBSCRIPTION,
	SUBSCRIPTION_REQUEST,
	AddSubscriptionAction,
	RemoveSubscriptionAction,
	SubscriptionRequestAction
} from './types';

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
				event: SUBSCRIPTION_REQUEST,
				payload: {
					successAction: addSubscription(subscription),
					failureAction: null,
					cometdChannel: `/event/${eventApiName}`
				}
			}
		}
	};
};