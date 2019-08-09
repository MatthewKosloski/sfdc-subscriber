class SocketController {

	constructor(client, socket, subscriptionRequestEvent,
		unsubscriptionRequestEvent, disconnectEvent) {

		this._client = client;
		this._socket = socket;

		this._onEvent = () => {};
		this._onSuccessfulSubscription = () => {};
		this._onFailedSubscription = () => {};
		this._onSuccessfulUnsubscription = () => {};
		this._onFailedUnsubscription = () => {};
		this._onSuccessfulCometdDisconnect = () => {};
		this._onFailedCometdDisconnect = () => {};

		this._socket.on(subscriptionRequestEvent, this._handleSubscriptionRequest.bind(this));
		this._socket.on(unsubscriptionRequestEvent, this._handleUnsubscriptionRequest.bind(this));
		this._socket.on(disconnectEvent, this._handleDisconnect.bind(this));

		console.log(`Socket ${this._socket.id} has connected to the channel.`);
	}

	set onEvent(val = () => {}) {
		this._onEvent = val;
	}

	set onSuccessfulSubscription(val = () => {}) {
		this._onSuccessfulSubscription = val;
	}

	set onFailedSubscription(val = () => {}) {
		this._onFailedSubscription = val;
	}

	set onSuccessfulUnsubscription(val = () => {}) {
		this._onSuccessfulUnsubscription = val;
	}

	set onFailedUnsubscription(val = () => {}) {
		this._onFailedUnsubscription = val;
	}

	set onSuccessfulCometdDisconnect(val = () => {}) {
		this._onSuccessfulCometdDisconnect = val;
	}

	set onFailedCometdDisconnect(val = () => {}) {
		this._onFailedCometdDisconnect = val;
	}

	_handleSubscriptionRequest(payload) {

		const { cometdChannel } = payload;

		const callback = (res) => {
			this._onEvent(res);
		};

		const subscribeCallback = ({successful}) => {
			if(successful) {
				this._onSuccessfulSubscription(payload);
			} else {
				this._onFailedSubscription(payload);
			}
		};

		this._client.subscribe(cometdChannel, callback, subscribeCallback);
	}

	_handleUnsubscriptionRequest(payload) {

		const { cometdChannel } = payload;

		const unsubscribeCallback = ({successful}) => {
			if(successful) {
				this._onSuccessfulUnsubscription(payload);
			} else {
				this._onFailedUnsubscription(payload);
			}
		};

		this._client.unsubscribe(cometdChannel, unsubscribeCallback);
	}

	_handleDisconnect(reason) {
		console.log(`Socket ${this._socket.id} has disconnected. Reason: ${reason}`);

		this._client.disconnect(({successful}) => {
			if(successful) {
				this._onSuccessfulCometdDisconnect();
			} else {
				this._onFailedCometdDisconnect();
			}
		});
	}
}

module.exports = SocketController;