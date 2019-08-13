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

export type EventState = {
	[key: string]: Event
};

export const ADD_EVENT = 'ADD_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const REMOVE_ALL_EVENTS = 'REMOVE_ALL_EVENTS';

interface AddEventAction extends AddEntityAction<typeof ADD_EVENT> {}
interface RemoveEventAction extends RemoveEntityAction<typeof REMOVE_EVENT> {}
interface RemoveAllEventsAction extends RemoveAllEntityAction<typeof REMOVE_ALL_EVENTS> {}

export type EventActionTypes = AddEventAction | RemoveEventAction | RemoveAllEventsAction;