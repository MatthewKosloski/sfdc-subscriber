import { AppState } from '../../';
import { Event } from '../events/types';

export const selectEvents = (state: AppState): Event[] => {
	return Object.values(state.entities.events.byId);
};

export const selectEventsBySubscriptionId = (subscriptionId: string) => (state: AppState): Event[] => {
	return Object.values(state.entities.events.byId)
		.filter((event) => event.subscriptionId === subscriptionId);
};

export const selectEventKeysBySubscriptionId = (subscriptionId: string) => (state: AppState): string[] => {
	const eventsWithSubscriptionId: Event[] = selectEventsBySubscriptionId(subscriptionId)(state);
	return eventsWithSubscriptionId.map((event) => event.id) as string[];
};

export const selectEventById = (id: string | null) => (state: AppState): Event | null => {
	if(state.entities.events.byId && id) {
		return state.entities.events.byId[id];
	} else {
		return null;
	}
};

export const selectLastEvent = (state: AppState): Event | null => {
	const lastEventId: string = state.entities.events.lastId;
	return selectEventById(lastEventId)(state);
};

export const selectLastEventId = (state: AppState): string | null => {
	if(state.entities.events.lastId) {
		return state.entities.events.lastId;
	} else {
		return null;
	}
};

export const selectLastEventSubscriptionId = (state: AppState): string | null => {
	const lastEvent = selectLastEvent(state);
	return lastEvent && lastEvent.subscriptionId
		? lastEvent.subscriptionId
		: null;
};

export const selectEventCreatedDateById = (state: AppState, id: string | null): string | null => {
	if(id) {
		const event = selectEventById(id)(state);
		return event && event.createdDate
			? event.createdDate
			: null;
	} else {
		return null;
	}
};