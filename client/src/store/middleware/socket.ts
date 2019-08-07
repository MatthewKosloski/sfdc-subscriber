import { MiddlewareAPI, Dispatch } from 'redux';
import io from 'socket.io-client';

import { addSubscription } from '../subscriptions/actions';

function socket() {
	const socket = io('http://localhost:3001');

	return (store: MiddlewareAPI) => {

		socket.on('PLATFORM_EVENT_SUBSCRIPTION_SUCCESS', (data: any) => {
			store.dispatch(addSubscription({
				color: 'salmon',
				eventApiName: data.payload.subscription.replace('/event/', ''),
				minuteDuration: 0
			}));
		});

		return (next: Dispatch) => (action: any) => {

			if(!action.event || !action.args) {
				return next(action);
			}
	
			socket.emit(action.event, action.args);
	
		};
	};
}

export default socket;