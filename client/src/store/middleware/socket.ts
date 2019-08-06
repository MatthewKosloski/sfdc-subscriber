import { MiddlewareAPI, Dispatch } from 'redux';
// import io from 'socket.io-client';

function socket() {
	return (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {

		return next(action);
	};
}

export default socket;