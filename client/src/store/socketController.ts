import { Dispatch } from 'redux';

import SocketEvents from '../../../common/socketEvents';

import { addToastSuccess, addToastError, addToastInfo } from './toast/actions';

const {
	PLATFORM_EVENT,
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
	PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE,
	COMETD_HANDSHAKE_SUCCESS,
	COMETD_HANDSHAKE_FAILURE,
	SALESFORCE_LOGIN_SUCCESS,
	SALESFORCE_LOGIN_FAILURE
} = SocketEvents;

interface platformEventSubscriptionPayload {
	cometdChannel: string
}

/**
 * Dispatches Redux actions in response to socket events
 * emitted from the server.
 */
export default (socket: SocketIOClient.Socket, dispatch: Dispatch) => {

	socket.on(SALESFORCE_LOGIN_SUCCESS, () => {
		dispatch(addToastSuccess('Successfully logged into Salesforce!'));
	});

	socket.on(SALESFORCE_LOGIN_FAILURE, () => {
		dispatch(addToastError('Failed to log into Salesforce.'));
	});

	socket.on(COMETD_HANDSHAKE_SUCCESS, () => {
		dispatch(addToastSuccess('Successfully shook hands with the Salesforce CometD server!'));
	});

	socket.on(COMETD_HANDSHAKE_FAILURE, () => {
		dispatch(addToastError('Failed to shake hands with the Salesforce CometD server.'));
	});

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
		({cometdChannel}: platformEventSubscriptionPayload) => {
			dispatch(addToastSuccess(`Successfully subscribed to ${cometdChannel}!`));
		}
	);

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
		({cometdChannel}: platformEventSubscriptionPayload) => {
			dispatch(addToastError(`Failed to subscribed to ${cometdChannel}.`));
		}
	);

	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, (data: any) => {
		console.log(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, data);
		dispatch(addToastSuccess(`Successfully unsubscribed from a Platform Event!`));
	});

	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE, (data: any) => {
		console.log(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE, data);
		dispatch(addToastError(`Failed to unsubscribe from a Platform Event.`));
	});

	socket.on(PLATFORM_EVENT, (data: any) => {
		console.log(PLATFORM_EVENT, data);
		dispatch(addToastInfo(`Received a Platform Event.`));
	});

};