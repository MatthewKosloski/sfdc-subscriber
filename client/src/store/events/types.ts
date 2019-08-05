export interface Event {
	uuid: string,
	createdById: string,
	createdDate: string,
	customFields: {
		[key: string]: string
	}
}

export type EventState = Event[];

export const ADD_EVENT = 'ADD_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';

interface AddEventAction {
	type: typeof ADD_EVENT,
	payload: Event
}

interface RemoveEventAction {
	type: typeof REMOVE_EVENT,
	meta: {
		uuid: string
	}
}

export type EventActionTypes = AddEventAction | RemoveEventAction;