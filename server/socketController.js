const socketEvents = require('./socketEvents');
const uuidv1 = require('uuid/v1');

const {
	REDUX_ACTION,
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
	PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE
} = socketEvents;

const _successToastAction = (message) => ({
	type: 'ADD_TOAST',
	payload: {
		variant: 'success',
		message
	}
});

const _errorToastAction = (message) => ({
	type: 'ADD_TOAST',
	payload: {
		variant: 'danger',
		message
	}
});

const _addEventAction = (payload) => ({
	type: 'ADD_EVENT',
	payload: {
		Uuid: uuidv1(),
		...payload
	}
});

const _emitReduxAction = (socket, action) => {
	socket.emit('REDUX_ACTION', action);
};

const _emitSuccessToast = (socket, message) => {
	return _emitReduxAction(socket, _successToastAction(message));
};

const _emitErrorToast = (socket, message) => {
	return _emitReduxAction(socket, _errorToastAction(message));
};

const _emitAddEventAction = (socket, payload) => {
	return _emitReduxAction(socket, _addEventAction(payload));
}

module.exports = function(sfdcClient, socket) {

	console.log(`Socket ${socket.id} has connected to the channel.`);

	const handleSubscriptionRequest = ({successAction, failureAction, cometdChannel}) => {

		const callback = ({channel, data: { payload }}) => {
			const { CreatedById, CreatedDate, ...customFields } = payload;

			_emitAddEventAction(socket, {
				EventApiName: channel.replace('/event/',''),
				CreatedById,
				CreatedDate,
				CustomFields: {
					...customFields
				}
			});

			console.log(`Sent a(n) ${channel} event to socket ${socket.id}.`);
		};

		const subscribeCallback = ({successful, subscription}) => {
			if(successful) {
				_emitReduxAction(socket, successAction);
				console.log(`Socket ${socket.id} is now subscribing to ${subscription}...`);
			} else {
				_emitReduxAction(socket, failureAction);
				console.log(`Socket ${socket.id} failed to subscribe to ${subscription}.`);
			}
		};

		sfdcClient.subscribe(cometdChannel, callback, subscribeCallback);
	};

	const handleUnsubscriptionRequest = ({payload: {cometdChannel}}) => {

		const unsubscribeCallback = (unsubscribeReply) => {

			const payload = {...unsubscribeReply};

			if(unsubscribeReply.successful) {
				socket.emit(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, {payload});
				console.log(`Socket ${socket.id} is now unsubscribed from ${cometdChannel}.`);
			} else {
				socket.emit(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE, {payload});
				console.log(`Socket ${socket.id} failed to unsubscribe from ${cometdChannel}.`);
			}
		};

		sfdcClient.unsubscribe(cometdChannel, unsubscribeCallback);
	};

	const handleDisconnect = (reason) => {
		console.log(`Socket ${socket.id} has disconnected. Reason: ${reason}`);

		sfdcClient.disconnect(({successful}) => {
			if(successful) {
				console.log('Successfully disconnected from the CometD server.');
			} else {
				console.log('Failed to disconnect from the CometD server.');
			}
		});
	};

	sfdcClient.onSuccessfulLogin = () => {
		return _emitSuccessToast(socket, 'Successfully logged into Salesforce!');
	};

	sfdcClient.onFailedLogin = () => {
		return _emitErrorToast(socket, 'Failed to log into Salesforce.');
	};

	sfdcClient.onSuccessfulHandshake = () => {
		return _emitSuccessToast(socket, 'Successfully shook hands with the Salesforce CometD server!');
	};

	sfdcClient.onFailedHandshake = () => {
		return _emitErrorToast(socket, 'Failed to shake hands with the Salesforce CometD server.');
	};

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_REQUEST, handleSubscriptionRequest);
	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST, handleUnsubscriptionRequest);
	socket.on('disconnect', handleDisconnect);
};