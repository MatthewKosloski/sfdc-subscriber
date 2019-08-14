import { AppState } from '../../';
import { Event } from '../events/types';

import { lastArrayElement } from '../../../utils';

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

export const selectEventById = (id: string) => (state: AppState): Event => {
	return state.entities.events.byId[id];
};

export const selectLastEvent = (state: AppState): Event => {
	const lastEventId: string = lastArrayElement(state.entities.events.allIds);
	return selectEventById(lastEventId)(state);
}