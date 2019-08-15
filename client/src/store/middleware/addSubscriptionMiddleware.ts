import { Dispatch } from 'redux';
import { ADD_SUBSCRIPTION } from '../entities/subscriptions/types';
import { randomColor } from '../../utils/';

export default () => () => (next: Dispatch) => (action: any) => {

	if(action.type === ADD_SUBSCRIPTION) {
		if(!action.payload.id && action.payload.eventApiName) {
			action.payload.id = action.payload.eventApiName;
		}
		if(!action.payload.color) {
			action.payload.color = randomColor();
		}
		if(!action.payload.minuteDuration) {
			action.payload.minuteDuration = 0;
		}
	}

	return next(action);
};