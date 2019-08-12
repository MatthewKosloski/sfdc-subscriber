import { AppState } from '../../';

export const selectSubscriptions = (state: AppState) => {
	return Object.values(state.entities.subscriptions);
};

export const selectSubscription = (id: string) => (state: AppState) => {
	return state.entities.subscriptions[id];
};