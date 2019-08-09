import { MiddlewareAPI, Dispatch } from 'redux';

function logger() {
	return (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
		console.log('will dispatch', action);

		// Call the next dispatch method in the middleware chain.
		const returnValue = next(action);

		console.log('state after dispatch', store.getState());

		// This will likely be the action itself, unless
		// a middleware further in chain changed it.
		return returnValue;
	};
}

export default logger;