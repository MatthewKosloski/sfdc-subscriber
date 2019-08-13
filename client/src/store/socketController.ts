import { Dispatch } from 'redux';

import SocketEvents from '../../../common/socketEvents';

import { addToastSuccess, addToastError, addToastInfo } from './entities/toast/actions';
import { addEvent } from './entities/events/actions';

import createEvent from '../utils/createEvent';
import createSubscription from '../utils/createSubscription';
import { addSubscription } from './entities/subscriptions/actions';

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

interface platformEventUnsubscriptionPayload {
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
		dispatch(addToastError('Failed to log into Salesforce. Check the accuracy of the login credentials in the server\'s .env file.'));
	});

	socket.on(COMETD_HANDSHAKE_SUCCESS, () => {
		dispatch(addToastSuccess('Successfully shook hands with the Salesforce CometD server!'));
	});

	socket.on(COMETD_HANDSHAKE_FAILURE, () => {
		dispatch(addToastError('Failed to shake hands with the Salesforce CometD server.'));
	});

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
		({cometdChannel}: platformEventSubscriptionPayload) => {
			const eventApiName: string = cometdChannel.replace('/event', '');
			dispatch(addToastSuccess(`Successfully subscribed to the ${eventApiName} Platform Event!`));
			dispatch(addSubscription({eventApiName}));
		}
	);

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
		({cometdChannel}: platformEventSubscriptionPayload) => {
			dispatch(addToastError(`Failed to subscribe to ${cometdChannel}. Are you sure that Platform Event exists?`));
		}
	);

	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
		({cometdChannel}: platformEventUnsubscriptionPayload) => {
			dispatch(addToastSuccess(`Successfully unsubscribed from ${cometdChannel}!`));
		}
	);

	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE,
		({cometdChannel}: platformEventUnsubscriptionPayload) => {
			dispatch(addToastError(`Failed to unsubscribe from ${cometdChannel}.`));
		}
	);

	socket.on(PLATFORM_EVENT, (eventData: any) => {
		dispatch(addToastInfo(`Received a Platform Event.`));
		dispatch(addEvent(createEvent(eventData)));
	});

};