import { 
	Subscription, 
	ADD_SUBSCRIPTION, 
	REMOVE_SUBSCRIPTION, 
	AddSubscriptionAction,
	RemoveSubscriptionAction,
	SubscribeAction 
} from './types';

export const addSubscription = (newSubscription: Subscription): AddSubscriptionAction => ({
	type: ADD_SUBSCRIPTION,
	payload: newSubscription
});

export const subscribe = (eventApiName: string): SubscribeAction => {
	return {
		event: 'PLATFORM_EVENT_SUBSCRIPTION_REQUEST',
		args: {
			payload: {
				cometdChannel: `/event/${eventApiName}`,
				socketEvent: 'PLATFORM_EVENT'
			}
		}
	};
};

export const removeSubscription = (eventApiName: string): RemoveSubscriptionAction => ({
	type: REMOVE_SUBSCRIPTION,
	meta: {
		eventApiName
	}
});