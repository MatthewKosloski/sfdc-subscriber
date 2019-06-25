const ioClient = require('socket.io-client');
const ioServer = require('socket.io');

const SFDCClient = require('./modules/SFDCClient');

const socketController = require('./socketController');
const socketEvents = require('./socketEvents');

const {
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE
} = socketEvents;

describe('socketController', () => {


	/**
	 * Mocks SFDCClient.subscribe, simulating a successful or
	 * unsuccessful subscription.
	 * @param {boolean} isSuccessfulSubscription Indicates if the subscription
	 * should succeed.
	 */
	const buildSubscriptionMock = (isSuccessfulSubscription = true) => {
		const implementation = (cometdChannel, _, subscribeCallback) => {
			subscribeCallback({
				successful: isSuccessfulSubscription, 
				subscription: cometdChannel
			});
		}
		
		sfdcClient.subscribe = jest.fn(implementation);
	};

	/**
	 * Creates a subscription request with a default payload.
	 * @param {object} payload The payload to send along with
	 * the PLATFORM_EVENT_SUBSCRIPTION_REQUEST event. 
	 */
	const createEventSubscriptionRequest = (payload = {
		cometdChannel: '/event/Fake_CometD_Channel__e',
		socketEvent: 'Fake_CometD_Channel_Event'
	}) => {
		client.emit(PLATFORM_EVENT_SUBSCRIPTION_REQUEST, {payload});
	};

	let port = 5000, uri = `http://localhost:${port}`;

	let server, client, sfdcClient;

	beforeEach(() => {
		server = ioServer().listen(port);
		client = ioClient(uri, {
			transports: ['websocket'],
			'force new connection': true
		});
		sfdcClient = new SFDCClient('clientId', 'clientSecret', 'username', 'password', 1);

		server.on('connection', socketController.bind(null, sfdcClient));

	});

	afterEach(() => {
		server.close();
		client.close();
	});

	test('Should have a client successfully connect to the Socket.io test server', (done) => {
		 client.on('connect', () => {
			expect(client.connected).toBeTruthy();
			client.disconnect();
			done();
        });
	});

	describe('handleSubscriptionRequest', () => {
		test('Should emit a PLATFORM_EVENT_SUBSCRIPTION_SUCCESS event when successfully subscribing to CometD', (done) => {
			client.on('connect', () => {

				// mock subscribe method to simulate a successful subscription
				buildSubscriptionMock();

				createEventSubscriptionRequest();
		
				client.on(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS, 
					({payload: {successful}}) => {
						expect(successful).toBeTruthy();
						done();
					}
				);
	
			});
		});

		test('Should emit a PLATFORM_EVENT_SUBSCRIPTION_FAILURE event when failing to subscribe to CometD', (done) => {
			client.on('connect', () => {

				// mock subscribe method to simulate a failed subscription
				buildSubscriptionMock(false);
	
				createEventSubscriptionRequest();
		
				client.on(PLATFORM_EVENT_SUBSCRIPTION_FAILURE, 
					({payload: {successful}}) => {
						expect(successful).toBeFalsy();
						done();
					}
				);
	
			});
		});

		test('Should emit a socket event when a payload is delivered to the CometD channel', (done) => {
			client.on('connect', () => {

				// mock subscribe method to simulate a payload being delivered to the CometD channel
				sfdcClient.subscribe = jest.fn((_, callback, __) => {
					const fakePayload = {foo: 'bar'};
					callback(fakePayload);
				});

				const socketEvent = 'Fake_Channel_Event';
	
				createEventSubscriptionRequest({
					cometdChannel: '/event/Fake_Channel__e',
					socketEvent
				});
		
				client.on(socketEvent, ({payload: {foo}}) => {
					expect(foo).toBe('bar');
					done();
				});
	
			});
		});
	});

});