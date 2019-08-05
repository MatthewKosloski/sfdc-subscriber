export interface Subscription {
	color: string,
	eventApiName: string,
	minuteDuration: number
}

export type SubscriptionState = Subscription[];

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';

interface AddSubscriptionAction {
	type: typeof ADD_SUBSCRIPTION,
	payload: Subscription
}

interface RemoveSubscriptionAction {
	type: typeof REMOVE_SUBSCRIPTION,
	meta: {
		eventApiName: string
	}
}

export type SubscriptionActionTypes = AddSubscriptionAction | RemoveSubscriptionAction;