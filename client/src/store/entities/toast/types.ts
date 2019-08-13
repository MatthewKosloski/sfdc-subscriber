import { 
	Entity, 
	AddEntityAction, 
	RemoveEntityAction 
} from '../types';

export interface Toast extends Entity {
	variant: string,
	message: string
}

export type ToastState = {
	[key: string]: Toast
};

export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export interface AddToastAction extends AddEntityAction<typeof ADD_TOAST> {}
export interface RemoveToastAction extends RemoveEntityAction<typeof REMOVE_TOAST> {}

export type ToastActionTypes = AddToastAction | RemoveToastAction;