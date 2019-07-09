const socketEvents = require('./socketEvents');

const {
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
	PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE
} = socketEvents;
    
module.exports = function(sfdcClient, socket) {

	console.log(`Socket ${socket.id} has connected to the channel.`);

	const handleSubscriptionRequest = ({payload: {cometdChannel, socketEvent}}) => {
		
		const callback = (payload) => {
			socket.emit(socketEvent, {payload});
			console.log(`Sent a(n) ${socketEvent} event to socket ${socket.id}.`);
		};

		const subscribeCallback = ({successful, subscription}) => {
			const payload = { successful, subscription };

			if(successful) {
				socket.emit(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS, {payload});
				console.log(`Socket ${socket.id} is now subscribing to ${subscription}...`);
			} else {
				socket.emit(PLATFORM_EVENT_SUBSCRIPTION_FAILURE, {payload});
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

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_REQUEST, handleSubscriptionRequest);
	socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST, handleUnsubscriptionRequest);
	socket.on('disconnect', handleDisconnect);

};