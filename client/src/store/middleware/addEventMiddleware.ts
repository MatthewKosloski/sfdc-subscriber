import { Dispatch } from 'redux';
import uuidv1 from 'uuid/v1';

import { ADD_EVENT } from '../entities/events/types';

export default () => () => (next: Dispatch) => (action: any) => {

	if(action.type === ADD_EVENT) {
		if(!action.payload.id) {
            action.payload.id = uuidv1();
        }
	}

	return next(action);
};