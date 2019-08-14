import {
	Entity,
	AddEntityAction,
	RemoveEntityAction,
	RemoveAllEntityAction
} from '../types';

export interface Event extends Entity {
	subscriptionId: string,
	createdById: string,
	createdDate: string,
	customFields: {
		[key: string]: string
	}
}

export type EventByIdState = { [key: string]: Event};
export type EventAllIdsState = string[];
export type EventLastIdState = string;

export const ADD_EVENT = 'ADD_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const REMOVE_EVENTS_WITH_SUBSCRIPTION_ID = 'REMOVE_EVENTS_WITH_SUBSCRIPTION_ID';
export const REMOVE_ALL_EVENTS = 'REMOVE_ALL_EVENTS';

interface AddEventAction extends AddEntityAction<typeof ADD_EVENT> {}
interface RemoveEventAction extends RemoveEntityAction<typeof REMOVE_EVENT> {}
interface RemoveEventsWithSubscriptionId extends RemoveEntityAction<typeof REMOVE_EVENTS_WITH_SUBSCRIPTION_ID> {}
interface RemoveAllEventsAction extends RemoveAllEntityAction<typeof REMOVE_ALL_EVENTS> {}

export type EventActionTypes =
	AddEventAction |
	RemoveEventAction |
	RemoveEventsWithSubscriptionId |
	RemoveAllEventsAction;