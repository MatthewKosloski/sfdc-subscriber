import {
	Entity,
	AddEntityAction,
	RemoveEntityAction,
	SocketEntityAction
} from '../types';

export interface Subscription extends Entity {
	// optional props are added by middleware
	color?: string,
	minuteDuration?: number,
	eventApiName: string
}

export type SubscriptionState = {
	[key: string]: Subscription
};

interface SubscriptionRequestPayload {
	cometdChannel: string
}

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
export const SUBSCRIPTION_REQUEST = 'SUBSCRIPTION_REQUEST';
export const UNSUBSCRIPTION_REQUEST = 'UNSUBSCRIPTION_REQUEST';

interface AddSubscriptionAction extends AddEntityAction<typeof ADD_SUBSCRIPTION> {}
interface RemoveSubscriptionAction extends RemoveEntityAction<typeof REMOVE_SUBSCRIPTION> {}
interface SubscriptionRequestAction extends SocketEntityAction<typeof SUBSCRIPTION_REQUEST, SubscriptionRequestPayload> {}
interface UnsubscriptionRequestAction extends SocketEntityAction<typeof UNSUBSCRIPTION_REQUEST, SubscriptionRequestPayload> {}

export type SubscriptionActionTypes = AddSubscriptionAction |
	RemoveSubscriptionAction |
	SubscriptionRequestAction |
	UnsubscriptionRequestAction;