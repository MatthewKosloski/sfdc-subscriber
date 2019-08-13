import { 
	Entity, 
	AddEntityAction, 
	RemoveEntityAction 
} from '../types';


export interface Subscription extends Entity {
	// optional props are added by middleware
	color?: string,
	minuteDuration?: number,
	eventApiName: string
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

interface AddSubscriptionAction extends AddEntityAction<typeof ADD_SUBSCRIPTION> {}
interface RemoveSubscriptionAction extends RemoveEntityAction<typeof REMOVE_SUBSCRIPTION> {}

export interface SubscriptionRequestAction {
	type: typeof SUBSCRIPTION_REQUEST,
	meta: ActionMetaSocket<{
		cometdChannel: string
	}>
}

export type SubscriptionActionTypes = AddSubscriptionAction | RemoveSubscriptionAction | SubscriptionRequestAction;