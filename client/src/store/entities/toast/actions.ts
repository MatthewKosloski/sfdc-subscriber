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
	} as Toast
});

export const addToastSuccess = (message: string): AddToastAction => ({
	type: ADD_TOAST,
	payload: {
		variant: 'success',
		message
	} as Toast
});

export const addToastInfo = (message: string): AddToastAction => ({
	type: ADD_TOAST,
	payload: {
		variant: 'primary',
		message
	} as Toast
});

export const removeToast = (id: string): RemoveToastAction => ({
	type: REMOVE_TOAST,
	meta: {
		id
	}
});