export interface Subscription {
	color: string,
	eventApiName: string,
	minuteDuration: number
}

export interface ActionMetaSocket<TPayload> {
	socket: {
		event: string,
		payload: TPayload
	}
}

export type SubscriptionState = Subscription[];

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
export const SUBSCRIPTION_REQUEST = 'SUBSCRIPTION_REQUEST';

export interface AddSubscriptionAction {
	type: typeof ADD_SUBSCRIPTION,
	payload: Subscription
}

export interface RemoveSubscriptionAction {
	type: typeof REMOVE_SUBSCRIPTION,
	meta: {
		eventApiName: string
	}
}

export interface SubscriptionRequestAction {
	type: typeof SUBSCRIPTION_REQUEST,
	meta: ActionMetaSocket<{
		cometdChannel: string
	}>
}

export type SubscriptionActionTypes = AddSubscriptionAction | RemoveSubscriptionAction | SubscriptionRequestAction;