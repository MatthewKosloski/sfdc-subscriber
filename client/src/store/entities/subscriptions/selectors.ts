import { AppState } from '../../';
import { Subscription } from './types';

export const selectSubscriptions = (state: AppState): Subscription[] => {
	return Object.values(state.entities.subscriptions);
};

export const selectSubscriptionById = (state: AppState, id: string): Subscription => {
	return state.entities.subscriptions[id];
};