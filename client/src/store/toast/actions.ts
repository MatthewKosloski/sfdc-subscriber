import {
	Toast,
	ADD_TOAST,
	REMOVE_TOAST,
	AddToastAction,
	RemoveToastAction
} from './types';

export const addToast = (newToast: Toast): AddToastAction => ({
	type: ADD_TOAST,
	payload: newToast
});

export const removeToast = (index: number): RemoveToastAction => ({
	type: REMOVE_TOAST,
	meta: {
		index
	}
});