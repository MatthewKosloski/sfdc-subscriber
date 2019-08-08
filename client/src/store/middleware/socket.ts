import { MiddlewareAPI, Dispatch } from 'redux';

import SocketEvents from '../../socketEvents';

function socket(socket: SocketIOClient.Socket) {
	return (store: MiddlewareAPI) => {

		socket.on(SocketEvents.REDUX_ACTION, store.dispatch);

		return (next: Dispatch) => (action: any) => {
			if(action.meta && action.meta.socket && action.meta.socket.event && action.meta.socket.payload) {
				const { event, payload } = action.meta.socket;
				socket.emit(event, payload);
			}

			return next(action);
		};
	};
}

export default socket;