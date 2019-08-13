import { Dispatch } from 'redux';

import SocketEvents from '../../../common/socketEvents';

import { addToastSuccess, addToastError, addToastInfo } from './entities/toast/actions';
import { addEvent } from './entities/events/actions';
import { Event } from './entities/events/types';
import { addSubscription, removeSubscription } from './entities/subscriptions/actions';

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

interface PlatformEventSubscriptionPayload {
	cometdChannel: string
}

interface PlatformEventUnsubscriptionPayload {
	cometdChannel: string
}

interface PlatformEventPayload {
	subscriptionId: string,
	createdById: string,
	createdDate: string,
	customFields: {
		[key: string]: string
	}
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
		({cometdChannel}: PlatformEventSubscriptionPayload) => {
			const eventApiName: string = cometdChannel.replace('/event/', '');
			dispatch(addToastSuccess(`Successfully subscribed to the ${eventApiName} Platform Event!`));
			dispatch(addSubscription({eventApiName}));
		}
	);

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
		({cometdChannel}: PlatformEventSubscriptionPayload) => {
			dispatch(addToastError(`Failed to subscribe to ${cometdChannel}. Are you sure that Platform Event exists?`));
		}
	);

	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
		({cometdChannel}: PlatformEventUnsubscriptionPayload) => {
			const eventApiName: string = cometdChannel.replace('/event/', '');
			dispatch(addToastSuccess(`Successfully unsubscribed from ${cometdChannel}!`));
			dispatch(removeSubscription(eventApiName));
		}
	);

	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE,
		({cometdChannel}: PlatformEventUnsubscriptionPayload) => {
			dispatch(addToastError(`Failed to unsubscribe from ${cometdChannel}.`));
		}
	);

	socket.on(PLATFORM_EVENT, (event: Event) => {
		dispatch(addToastInfo(`Received a ${event.subscriptionId} Platform Event.`));
		dispatch(addEvent(event));
	});

};