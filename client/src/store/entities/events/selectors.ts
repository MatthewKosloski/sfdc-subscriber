import { AppState } from '../../';
import { Event } from '../events/types';

export const selectEvents = (state: AppState): Event[] => {
	return Object.values(state.entities.events);
};

export const selectEventsBySubscriptionId = (subscriptionId: string) => (state: AppState): Event[] => {
	return Object.values(state.entities.events)
		.filter((event) => event.subscriptionId === subscriptionId);
};

export const selectEventKeysBySubscriptionId = (subscriptionId: string) => (state: AppState): string[] => {
	const eventsWithSubscriptionId: Event[] = selectEventsBySubscriptionId(subscriptionId)(state);
	return eventsWithSubscriptionId.map((event) => event.id) as string[];
};

export const selectEventById = (id: string) => (state: AppState): Event => {
	return state.entities.events[id];
};