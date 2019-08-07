import {
	ToastState,
	ToastActionTypes,
	ADD_TOAST,
	REMOVE_TOAST
} from './types';

const initialState: ToastState = [{
	variant: 'danger',
	message: 'Failed to subscribe to event Data_Center_Statuss__e.'
}, {
	variant: 'danger',
	message: 'Failed to subscribe to event Data_Center_Statuss__e.'
}];

/**
 * Indicates if there exists a toast object in state with a
 * particular index.
 *
 * @param state The reducer state
 * @param index The index of the toast
 */
function hasToast(state: ToastState, index: number): boolean {
	return state[index] !== undefined;
};

export function toastReducer(
	state = initialState,
	action: ToastActionTypes
): ToastState {

	switch(action.type) {
		case ADD_TOAST: {
			return [action.payload, ...state];
		}
		case REMOVE_TOAST: {
			const { index } = action.meta;
			if(hasToast(state, index)) {
				return [...state.slice(0, index), ...state.slice(index + 1)];
			} else {
				return state;
			}
		}
		default: {
			return state;
		}
	}
}