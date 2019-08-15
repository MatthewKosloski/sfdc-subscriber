import {
	Toast,
	ToastState,
	ToastActionTypes,
	ADD_TOAST,
	REMOVE_TOAST
} from './types';

const initialState: ToastState = {};

export function toastReducer(
	state = initialState,
	action: ToastActionTypes
): ToastState {

	switch(action.type) {
		case ADD_TOAST: {
			const payload = action.payload as Toast;
			return {
				[payload.id as string]: {
					...payload
				},
				...state
			};
		}
		case REMOVE_TOAST: {
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