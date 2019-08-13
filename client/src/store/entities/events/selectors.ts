import { AppState } from '../../';
import { Event } from '../events/types';

export const selectEvents = (state: AppState): Event[] => {
	return Object.values(state.entities.events);
};

export const selectEventById = (id: string) => (state: AppState): Event => {
	return state.entities.events[id];
};