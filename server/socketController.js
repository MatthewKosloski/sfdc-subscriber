
const socketEvents = require('./socketEvents');

const {
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE
} = socketEvents;
    
module.exports = function(sfdcClient, socket) {

	console.log(`Socket ${socket.id} has connected to the channel.`);

	const handleSubscriptionRequest = ({payload: {cometdChannel, socketEvent}}) => {
		
		const callback = (payload) => {
			socket.emit(socketEvent, {payload});
			console.log(`Sent a payload to clients listening to ${socketEvent}.`);
		}

		const subscribeCallback = ({successful, subscription}) => {
			const payload = { successful, subscription };

			if(successful) {
				socket.emit(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS, {payload});
				console.log(`Now subscribing to ${subscription}...`);
			} else {
				socket.emit(PLATFORM_EVENT_SUBSCRIPTION_FAILURE, {payload});
				console.log(`Failed to subscribe to ${subscription}.`);
			}
		}
		
		sfdcClient.subscribe(cometdChannel, callback, subscribeCallback);
	}

	socket.on(PLATFORM_EVENT_SUBSCRIPTION_REQUEST, handleSubscriptionRequest);

};