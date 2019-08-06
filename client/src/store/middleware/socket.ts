import { MiddlewareAPI, Dispatch } from 'redux';
import io from 'socket.io-client';

function socket() {
	const socket: SocketIOClient.Socket = io('http://localhost:3001');

	return (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {

		const shouldSkipMiddleware: boolean = action.type !== 'ADD_SUBSCRIPTION';

		if(shouldSkipMiddleware) {
			return next(action);
		}

		return socket.emit(action.event, action.handle);
	};
}

export default socket;