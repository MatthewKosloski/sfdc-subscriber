export interface Toast {
	variant: string,
	message: string
}

export type ToastState = Toast[];

export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export interface AddToastAction {
	type: typeof ADD_TOAST,
	payload: Toast
}

export interface RemoveToastAction {
	type: typeof REMOVE_TOAST,
	meta: {
		index: number
	}
}

export type ToastActionTypes = AddToastAction | RemoveToastAction;