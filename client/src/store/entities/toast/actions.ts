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

export const addToastError = (message: string): AddToastAction => ({
	type: ADD_TOAST,
	payload: {
		variant: 'danger',
		message
	}
});

export const addToastSuccess = (message: string): AddToastAction => ({
	type: ADD_TOAST,
	payload: {
		variant: 'success',
		message
	}
});

export const addToastInfo = (message: string): AddToastAction => ({
	type: ADD_TOAST,
	payload: {
		variant: 'primary',
		message
	}
});

export const removeToast = (index: number): RemoveToastAction => ({
	type: REMOVE_TOAST,
	meta: {
		index
	}
});