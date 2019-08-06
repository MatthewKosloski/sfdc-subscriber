import { MiddlewareAPI, Dispatch } from 'redux';
import io from 'socket.io-client';

function socket() {
	const socket = io('http://localhost:3001');

	return (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {

		if(action.type === 'ADD_SUBSCRIPTION') {
			socket.emit('PLATFORM_EVENT_SUBSCRIPTION_REQUEST', {foo: 'bar'});
			return;
		} else {
			return next(action);
		}

	};
}

export default socket;