import {
	Toast,
	ADD_TOAST,
	REMOVE_TOAST,
	ToastActionTypes
} from './types';

export const addToast = (newToast: Toast): ToastActionTypes => ({
	type: ADD_TOAST,
	payload: newToast
});

export const addToastError = (message: string): ToastActionTypes => ({
	type: ADD_TOAST,
	payload: {
		variant: 'danger',
		message
	} as Toast
});

export const addToastSuccess = (message: string): ToastActionTypes => ({
	type: ADD_TOAST,
	payload: {
		variant: 'success',
		message
	} as Toast
});

export const addToastInfo = (message: string): ToastActionTypes => ({
	type: ADD_TOAST,
	payload: {
		variant: 'primary',
		message
	} as Toast
});

export const removeToast = (id: string): ToastActionTypes => ({
	type: REMOVE_TOAST,
	meta: {
		id
	}
});