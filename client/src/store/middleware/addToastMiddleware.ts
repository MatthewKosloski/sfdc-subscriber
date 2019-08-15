import { Dispatch } from 'redux';
import uuidv1 from 'uuid/v1';

import { ADD_TOAST } from '../entities/toast/types';

export default () => () => (next: Dispatch) => (action: any) => {

	if(action.type === ADD_TOAST) {
		console.log('add toast...');
		if(!action.payload.id) {
            action.payload.id = uuidv1();
        }
	}

	return next(action);
};