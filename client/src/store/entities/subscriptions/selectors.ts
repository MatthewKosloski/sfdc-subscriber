import { AppState } from '../../';
import { Subscription } from './types';

export const selectSubscriptions = (state: AppState): Subscription[] | null => {
	if(state.entities.subscriptions) {
		return Object.values(state.entities.subscriptions);
	} else {
		return null;
	}
};

export const selectSubscriptionById = (state: AppState, id: string | null): Subscription | null => {
	if(id && state.entities.subscriptions[id]) {
		return state.entities.subscriptions[id];
	} else {
		return null;
	}
};

export const selectSubscriptionColorById = (state: AppState, subscriptionId: string | null): string | null => {
	if(subscriptionId) {
		const subscription = selectSubscriptionById(state, subscriptionId);

		return subscription && subscription.color
			? subscription.color
			: null;
	} else {
		return null;
	}
};