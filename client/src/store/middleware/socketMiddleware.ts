import { Dispatch } from 'redux';

export default (socket: SocketIOClient.Socket) => {
	return () => (next: Dispatch) => (action: any) => {
		if(action.meta && action.meta.socket && action.meta.socket.event && action.meta.socket.payload) {
			const { event, payload } = action.meta.socket;
			socket.emit(event, payload);
		}

		return next(action);
	};
};