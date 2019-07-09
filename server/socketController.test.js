const cometdLib = require('cometd');
const jsforceLib = require('jsforce');
const ioClient = require('socket.io-client');
const ioServer = require('socket.io');

const SFDCClient = require('./modules/SFDCClient');

const socketController = require('./socketController');
const socketEvents = require('./socketEvents');

const {
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
	PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE
} = socketEvents;

describe('socketController', () => {

	/**
	 * Mocks SFDCClient.subscribe, simulating a successful or
	 * unsuccessful subscription.
	 * @param {boolean} isSuccessfulSubscription Indicates if the subscription
	 * should succeed.
	 * @param {object} payload A fake event payload.
	 */
	const sfdcclient_subscribe_mock = (isSuccessfulSubscription = true, payload = {}) => {
		const implementation = (cometdChannel, callback, subscribeCallback) => {
			callback(payload);
			subscribeCallback({
				successful: isSuccessfulSubscription, 
				subscription: cometdChannel
			});
		};
		
		return jest.fn(implementation);
	};

	/**
	 * Mocks SFDCClient.unsubscribe, simulating a successful or
	 * unsuccessful unsubscription.
	 * @param {boolean} isSuccessfulUnsubscription Indicates if the unsubscription
	 * should succeed.
	 */
	const sfdcclient_unsubscribe_mock = (isSuccessfulUnsubscription = true) => {
		const implementation = (cometdChannel, unsubscribeCallback) => {
			unsubscribeCallback({
				successful: isSuccessfulUnsubscription,
				cometdChannel
			});
		};
		
		return jest.fn(implementation);
	};

	/**
	 * Mocks SFDCClient.disconnect, simulating a successful or
	 * unsuccessful disconnection.
	 * @param {boolean} isSuccessfulDisconnect Indicates if the disconnect
	 * should succeed.
	 */
	const sfdcclient_disconnect_mock = (isSuccessfulDisconnect = true) => {
		const implementation = (disconnectCallback) => {
			disconnectCallback({
				successful: isSuccessfulDisconnect
			});
		};

		return jest.fn(implementation);
	};

	/**
	 * Creates a subscription request with a default payload.
	 * @param {SocketIO.Socket} client The client sending the request.
	 * @param {object} payload The payload to send along with
	 * the PLATFORM_EVENT_SUBSCRIPTION_REQUEST event. 
	 */
	const createEventSubscriptionRequest = (client, payload = {
		cometdChannel: '/event/Fake_CometD_Channel__e',
		socketEvent: 'Fake_CometD_Channel_Event'
	}) => {
		client.emit(PLATFORM_EVENT_SUBSCRIPTION_REQUEST, {payload});
		return payload;
	};

	/**
	 * Creates an unsubscription request with a default payload.
	 * @param {SocketIO.Socket} client The client sending the request.
	 * @param {object} payload The payload to send along with
	 * the PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST event. 
	 */
	const createEventUnsubscriptionRequest = (client, payload = {
		cometdChannel: '/event/Fake_CometD_Channel__e'
	}) => {
		client.emit(PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST, {payload});
		return payload;
	};

	let port = 5000, 
		uri = `http://localhost:${port}`,
		connectOptions = {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true,
            transports: ['websocket']
		};

	let server;
    let sfdcClient;
    
	beforeEach(() => {
		server = ioServer().listen(port);

		server.on('connection', (socket) => {
			console.log('Connection to Socket.io test server.');

			const cometd = new cometdLib.CometD();
			const jsforce = new jsforceLib.Connection({
				oauth2 : { 
					CLIENT_ID: 'clientId',
					CLIENT_SECRET: 'clientSecret'
				}
			});

			sfdcClient = new SFDCClient(cometd, jsforce, 'username', 'password', 1, true);
			socketController(sfdcClient, socket);
        });
    
	});

	afterEach((done) => {
		server.close();
		done();
    });
    
    const createClient = () => {
        return ioClient.connect(uri, connectOptions);
    }

	test('Should have one client connect to the server', (done) => {
        const client = createClient();

        client.on('connect', () => {
            expect(client.connected).toBeTruthy();
            client.disconnect();
            done();
        });
    });

    test('Should have two clients connect to the server', (done) => {
        const client1 = createClient();

        client1.on('connect', () => {

            const client2 = createClient();

            client2.on('connect', () => {
                expect(client1.connected).toBeTruthy();
                expect(client2.connected).toBeTruthy();
                
                client1.disconnect();
                client2.disconnect();
                done();
            });

        });
    });

    // test('Should not send subscriptions to disconnected sockets', (done) => {
	// 	const client1 = createClient();

	// 	const fakePayload = {foo: 'baz'};

	// 	const client1SubscribeMock = sfdcclient_subscribe_mock(true, fakePayload),
	// 		client2SubscribeMock = sfdcclient_subscribe_mock(true, fakePayload);

	// 	const client1UnsubscribeMock = sfdcclient_unsubscribe_mock(),
	// 		client2UnsubscribeMock = sfdcclient_unsubscribe_mock();

    //     client1.on('connect', () => {

	// 		sfdcClient.subscribe = client1SubscribeMock;
	// 		sfdcClient.unsubscribe = client1UnsubscribeMock;

    //         const client2 = createClient();

    //         client2.on('connect', () => {

	// 			sfdcClient.subscribe = client2SubscribeMock;
	// 			sfdcClient.unsubscribe = client2UnsubscribeMock;

	// 			// subscribe client1 to an event
	// 			const { socketEvent }  = createEventSubscriptionRequest(client1);

	// 			client1.on(socketEvent, () => {

	// 				// unsubscribe client1 from an event
	// 				createEventUnsubscriptionRequest(client1);

	// 				client1.on(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, () => {

	// 					// subscribe client2 to the same event
	// 					createEventSubscriptionRequest(client2);

	// 					client2.on(socketEvent, () => {
							
	// 						// unsubscribe client2 from the event
	// 						createEventUnsubscriptionRequest(client2);

	// 						client2.on(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, () => {
	// 							client1.disconnect();
	// 							client2.disconnect();
	// 							done();
	// 						});

	// 					});

	// 				});
	// 			});

    //         });

    //     });
    // });

	describe('handleSubscriptionRequest', () => {

		test('Should emit a PLATFORM_EVENT_SUBSCRIPTION_SUCCESS event when successfully subscribing to CometD', (done) => {
            const client = createClient();

			client.on('connect', () => {

				// mock subscribe method to simulate a successful subscription
				sfdcClient.subscribe = sfdcclient_subscribe_mock();

				createEventSubscriptionRequest(client);
		
				client.on(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS, 
					({payload: {successful}}) => {
						expect(successful).toBeTruthy();
						
						client.disconnect();
						done();
					}
				);
	
			});
		});

		test('Should emit a PLATFORM_EVENT_SUBSCRIPTION_FAILURE event when failing to subscribe to CometD', (done) => {
            const client = createClient();

			client.on('connect', () => {

				// mock subscribe method to simulate a failed subscription
				sfdcClient.subscribe = sfdcclient_subscribe_mock(false);
	
				createEventSubscriptionRequest(client);
		
				client.on(PLATFORM_EVENT_SUBSCRIPTION_FAILURE, 
					({payload: {successful}}) => {
                        expect(successful).toBeFalsy();
                        
						client.disconnect();
						done();
					}
				);
	
			});
		});

		test('Should emit a socket event when a payload is delivered to the CometD channel', (done) => {
            const client = createClient();

			client.on('connect', () => {

				const fakePayload = {foo: 'bar'};
				// mock subscribe method to simulate a payload being delivered to the CometD channel
				sfdcClient.subscribe = sfdcclient_subscribe_mock(true, fakePayload);
	
				const { socketEvent } = createEventSubscriptionRequest(client);
		
				client.on(socketEvent, ({payload}) => {
                    expect(payload.foo).toBe(fakePayload.foo);
                    
					client.disconnect();
					done();
				});
	
			});
        });
        
	});
	
	describe('handleUnsubscriptionRequest', () => {

		test('Should emit a PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS event when successfully unsubscribing from CometD', (done) => {
            const client = createClient();

			client.on('connect', () => {

				// mock unsubscribe method to simulate a successful unsubscription
				sfdcClient.unsubscribe = sfdcclient_unsubscribe_mock();

				createEventUnsubscriptionRequest(client);
		
				client.on(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, 
					({payload: {successful}}) => {
						expect(successful).toBeTruthy();
						
						client.disconnect();
						done();
					}
				);
	
			});
		});

		test('Should emit a PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE event when failing to unsubscribe from CometD', (done) => {
            const client = createClient();

			client.on('connect', () => {

				// mock unsubscribe method to simulate a failed unsubscription
				sfdcClient.unsubscribe = sfdcclient_unsubscribe_mock(false);
	
				createEventUnsubscriptionRequest(client);
		
				client.on(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE, 
					({payload: {successful}}) => {
                        expect(successful).toBeFalsy();
                        
						client.disconnect();
						done();
					}
				);
	
			});
		});

	});

});