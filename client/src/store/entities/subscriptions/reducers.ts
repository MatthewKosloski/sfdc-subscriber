import {
	SubscriptionState,
	SubscriptionActionTypes,
	ADD_SUBSCRIPTION,
	REMOVE_SUBSCRIPTION,
	Subscription
} from './types';

const initialState: SubscriptionState = {};

export function subscriptionsReducer(
	state = initialState,
	action: SubscriptionActionTypes
): SubscriptionState {

	switch(action.type) {
		case ADD_SUBSCRIPTION: {
			const payload = action.payload as Subscription;
			return {
				...state,
				[payload.id as string]: {
					...payload
				}
			};
		}
		case REMOVE_SUBSCRIPTION: {
			if(state[action.meta.id] !== undefined) {
				const newState = {...state};
				delete newState[action.meta.id];
				return newState;
			}
			return state;
		}
		default: {
			return state;
		}
	}
}