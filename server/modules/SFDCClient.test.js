const cometdLib = require('cometd');
const jsforceLib = require('jsforce');

const SFDCClient = require('./SFDCClient');

describe('SFDCClient', () => {

    /**
     * Builds a mock for CometD.subscribe.
     * @param {boolean} isSuccessful Indicates if the subscription should succeed.
     */
    const cometd_subscribe_mock = (isSuccessful = true) => {
        const implementation = (channel, _, subscribeCallback) => {
            const typeOfLogin = isSuccessful ? 'successful' : 'unsuccessful';
            const fakeResponse = {successful: isSuccessful, subscription: channel};

            console.log(`Simulating a(n) ${typeOfLogin} subscription to channel ${channel}.`);
            subscribeCallback(fakeResponse);

            return {};
        };

        return jest.fn(implementation);
    };

    /**
     * Builds a mock for CometD.unsubscribe.
     * @param {boolean} isSuccessful Indicates if the unsubscription should succeed.
     */
    const cometd_unsubscribe_mock = (isSuccessful = true) => {
        const implementation = (subscription, unsubscribeCallback) => {
            const typeOfLogin = isSuccessful ? 'successful' : 'unsuccessful';
            const fakeResponse = {successful: isSuccessful};

            console.log(`Simulating a(n) ${typeOfLogin} unsubscription.`);
            unsubscribeCallback(fakeResponse);

            return {};
        };

        return jest.fn(implementation);
    };

    /**
     * Builds a mock for Cometd.handshake.
     * @param {boolean} isSuccessful Indicates if the handshake should succeed.
     */
    const cometd_handshake_mock = (isSuccessful = true) => {
        const implementation = (callback) => {
            const typeOfHandshake = isSuccessful ? 'successful' : 'unsuccessful';
            const fakeResponse = {successful: isSuccessful};

            console.log(`Simulating a(n) ${typeOfHandshake} handshake with the CometD server.`);
            callback(fakeResponse);
        };

        return jest.fn(implementation);
    };

    /**
     * Builds a mock for CometD.disconnect.
     */
    const cometd_disconnect_mock = (isSuccessful = true) => {
        const implementation = () => {
            const typeOfHandshake = isSuccessful ? 'successful' : 'unsuccessful';
            console.log(`Simulating a(n) ${typeOfHandshake} disconnect from the CometD server.`);
        };

        return jest.fn(implementation);
    };

    /**
     * Builds a mock for jsforce.login.
     * @param {boolean} isSuccessful Indicates if the login should succeed.
     */
    const jsforce_login_mock = (isSuccessful = true) => {

        const err = new Error('Fake error about failing to login');

        const implementation = (username, password, callback) => {
            const typeOfLogin = isSuccessful ? 'successful' : 'unsuccessful';
            const fakeResponse = {accessToken: 'accessToken', instanceUrl: 'instanceUrl'};

            console.log(`Simulating a(n) ${typeOfLogin} login with Salesforce with username \"${username}\" and password \"${password}\".`);
            callback(isSuccessful ? null : err);

            return fakeResponse;
        };

        return jest.fn(implementation);
    };

    // Variables used in unit tests
    const noop = () => {};
    const channels = [
        '/event/Dummy_Event_1__e', 
        '/event/Dummy_Event_2__e', 
        '/event/Dummy_Event_3__e'];
    
    // Variables used to create client object
    const clientId = 'clientId',
        clientSecret = 'clientSecret',
        username = 'username',
        password = 'password',
        apiVersion = '43',
        isDebugMode = true;


    let client, cometd, jsforce;

    beforeEach(() => {
        cometd = new cometdLib.CometD();
        jsforce = new jsforceLib.Connection({
            oauth2 : { 
                CLIENT_ID: clientId,
                CLIENT_SECRET: clientSecret
            }
        });
        client = new SFDCClient(cometd, jsforce, username, password, apiVersion, isDebugMode);
    });

    describe('#subscribe', () => {
        test('Should call CometD.subscribe with the arguments passed to subscribe', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            const cometdHandshakeMock = cometd_handshake_mock();
    
            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;
    
            await client.subscribe(channels[0], noop, noop);
    
            const firstArgument = cometdSubscribeMock.mock.calls[0][0];
            const secondArgument = cometdSubscribeMock.mock.calls[0][1];
            const thirdArgument = cometdSubscribeMock.mock.calls[0][2];
    
            // we expect CometD.subscribe to be called.
            expect(cometdSubscribeMock.mock.calls.length).toBe(1);
    
            // the arguments we passed to subscribe should have been passed to CometD.subscribe.
            expect(firstArgument).toBe(channels[0]);
            expect(secondArgument).toBe(noop);
            expect(thirdArgument).toBe(noop);
        });

        test('Should only handshake with CometD once, after the first subscription', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            const cometdHandshakeMock = cometd_handshake_mock();
    
            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;
    
            // Haven't subscribed yet, so no handshake should have occurred.
            expect(cometdHandshakeMock.mock.calls.length).toBe(0);
    
            await client.subscribe(channels[0], noop, noop);
    
            // Subscribed, so a handshake should have occurred.
            expect(cometdHandshakeMock.mock.calls.length).toBe(1);
    
            await client.subscribe(channels[1], noop, noop);
            await client.subscribe(channels[2], noop, noop);
    
            // No more handshakes should occur
            expect(cometdHandshakeMock.mock.calls.length).toBe(1);
        });
    
        test('Should throw an Error when subscribing to a channel more than once', async () => {  
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            const cometdHandshakeMock = cometd_handshake_mock();
    
            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;
    
            expect(client.hasSubscription(channels[0])).toBeFalsy();

            await client.subscribe(channels[0], noop, noop);

            expect(client.hasSubscription(channels[0])).toBeTruthy();

            try {
                await client.subscribe(channels[0], noop, noop);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
    
            expect(client.hasSubscription(channels[0])).toBeTruthy();
    
            // even though we called SFDCClient.subscribe twice, CometD.subscribe should have only been called once.
            expect(cometdSubscribeMock.mock.calls.length).toBe(1);
        });

        test('Should throw Error when failing to login with Salesforce', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            // simulate a failed login
            const jsforceLoginMock = jsforce_login_mock(false);
            const cometdHandshakeMock = cometd_handshake_mock();
    
            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;
    
            try {
                await client.subscribe(channels[0], noop, noop);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    
        test('Should throw Error when failing to handshake with the Salesforce CometD server', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            // simulate a failed handshake
            const cometdHandshakeMock = cometd_handshake_mock(false);
    
            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;
    
            try {
                await client.subscribe(channels[0], noop);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    
    
    });

    describe('#disconnect', () => {
        test('Should call CometD.disconnect with the arguments passed to disconnect', () => {
            const mockDisconnect = cometd_disconnect_mock();
            cometd.disconnect = mockDisconnect;
    
            client.disconnect(noop);
    
            const firstArgument = mockDisconnect.mock.calls[0][0];
    
            expect(mockDisconnect.mock.calls.length).toBe(1);
            expect(firstArgument).toBe(noop);
        });
    });

    describe('#unsubscribe', () => {
       test('Should remove subscription from memory if unsubscription succeeds', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            const cometdHandshakeMock = cometd_handshake_mock();
            const cometdUnsubscribeMock = cometd_unsubscribe_mock();

            // Mock these methods as we don't want to be making network calls

            cometd.subscribe = cometdSubscribeMock;
            cometd.unsubscribe = cometdUnsubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;

            expect(client.hasSubscription(channels[0])).toBeFalsy();

            await client.subscribe(channels[0], noop, noop);

            expect(client.hasSubscription(channels[0])).toBeTruthy();
            
            client.unsubscribe(channels[0], noop);

            // No longer subscribed, so should be false.
            expect(client.hasSubscription(channels[0])).toBeFalsy(); 
       }); 

       test('Should not remove subscription from memory if unsubscription fails', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            const cometdHandshakeMock = cometd_handshake_mock();
            // simulate failed unsubscription
            const cometdUnsubscribeMock = cometd_unsubscribe_mock(false);

            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.unsubscribe = cometdUnsubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;

            expect(client.hasSubscription(channels[0])).toBeFalsy();

            await client.subscribe(channels[0], noop, noop);

            expect(client.hasSubscription(channels[0])).toBeTruthy();
            
            client.unsubscribe(channels[0], noop);

            // Simulated an unsuccessful unsubscription, so we are still subscribed.
            expect(client.hasSubscription(channels[0])).toBeTruthy();
       }); 

       test('Should call CometD.unsubscribe', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            const cometdHandshakeMock = cometd_handshake_mock();
            const cometdUnsubscribeMock = cometd_unsubscribe_mock();

            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.unsubscribe = cometdUnsubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;

            await client.subscribe(channels[0], noop, noop);

            client.unsubscribe(channels[0], noop);

            expect(cometdUnsubscribeMock.mock.calls.length).toBe(1);
       });

       test('Should invoke the unsubscribeCallback argument with the unsubscribeReply object', async () => {
            const cometdSubscribeMock = cometd_subscribe_mock();
            const jsforceLoginMock = jsforce_login_mock();
            const cometdHandshakeMock = cometd_handshake_mock();
            const cometdUnsubscribeMock = cometd_unsubscribe_mock();

            // Mock these methods as we don't want to be making network calls
            cometd.subscribe = cometdSubscribeMock;
            cometd.unsubscribe = cometdUnsubscribeMock;
            cometd.handshake = cometdHandshakeMock;
            jsforce.login = jsforceLoginMock;

            await client.subscribe(channels[0], noop, noop);

            const unsubscribeCallback = jest.fn();

            client.unsubscribe(channels[0], unsubscribeCallback);

            expect(unsubscribeCallback.mock.calls.length).toBe(1);
            expect(unsubscribeCallback.mock.calls[0][0]).toHaveProperty('successful', true);
        });

        test('Should throw an Error when trying to unsubscribe from a channel that has no subscription', () => {
            const cometdUnsubscribeMock = cometd_unsubscribe_mock();
            cometd.unsubscribe = cometdUnsubscribeMock;

            let unsubscribeCallback;
            
            expect(() => {
                unsubscribeCallback = jest.fn();
                client.unsubscribe(channels[0], unsubscribeCallback);
            }).toThrow();

            expect(unsubscribeCallback.mock.calls.length).toBe(0);
        });
    });

});