import { Dispatch } from 'redux';
import uuidv1 from 'uuid/v1';

import { ADD_SUBSCRIPTION } from '../entities/subscriptions/types';
import { ADD_EVENT } from '../entities/events/types';

export default () => () => (next: Dispatch) => (action: any) => {
	if(action.type === ADD_SUBSCRIPTION) {
		if(action.payload && action.payload.id === undefined) {
			action.payload.id = action.payload.eventApiName;
		}
	}

	return next(action);
};