import {
	SubscriptionState,
	SubscriptionActionTypes,
	ADD_SUBSCRIPTION,
	REMOVE_SUBSCRIPTION
} from './types';

const initialState: SubscriptionState = [];

/**
 * Indicates if there exists a subscription object in state with a
 * particular event API name.
 *
 * @param state The reducer state
 * @param eventApiName The event API name to use for the check.
 */
function hasSubscription(state: SubscriptionState, eventApiName: string): boolean {
	return state.some((subscription) => subscription.eventApiName === eventApiName);
};

export function subscriptionsReducer(
	state = initialState,
	action: SubscriptionActionTypes
): SubscriptionState {

	switch(action.type) {
		case ADD_SUBSCRIPTION: {
			if(hasSubscription(state, action.payload.eventApiName)) {
				return state;
			} else {
				return [action.payload, ...state];
			}
		}
		case REMOVE_SUBSCRIPTION: {
			if(hasSubscription(state, action.meta.eventApiName)) {
				return state.filter((subscription) =>
					subscription.eventApiName !== action.meta.eventApiName);
			} else {
				return state;
			}
		}
		default: {
			return state;
		}
	}
}