export interface Subscription {
	// make id prop optional so middleware can add ids
	id?: string,
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

export type SubscriptionState = {
	[key: string]: Subscription
};

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
		id: string
	}
}

export interface SubscriptionRequestAction {
	type: typeof SUBSCRIPTION_REQUEST,
	meta: ActionMetaSocket<{
		cometdChannel: string
	}>
}

export type SubscriptionActionTypes = AddSubscriptionAction | RemoveSubscriptionAction | SubscriptionRequestAction;