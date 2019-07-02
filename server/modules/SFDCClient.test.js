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
    const cometd_disconnect_mock = () => {
        return jest.fn();
    }

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
    const emptyCallback = () => {};
    const channels = [
        '/event/Dummy_Event_1__e', 
        '/event/Dummy_Event_2__e', 
        '/event/Dummy_Event_3__e'];
    
    // Variables used to create client object
    const clientId = 'clientId',
        clientSecret = 'clientSecret',
        username = 'username',
        password = 'password',
        apiVersion = '43';


    let client, cometd, jsforce;

    beforeEach(() => {
        cometd = new cometdLib.CometD();
        jsforce = new jsforceLib.Connection({
            oauth2 : { 
                CLIENT_ID: clientId,
                CLIENT_SECRET: clientSecret
            }
        });
        client = new SFDCClient(cometd, jsforce, username, password, apiVersion);
    });

    test('Should only handshake with CometD when subscribing for the first time', async () => {
        const cometdSubscribeMock = cometd_subscribe_mock();
        const jsforceLoginMock = jsforce_login_mock();
        const cometdHandshakeMock = cometd_handshake_mock();

        // Mock these methods as we don't want to be making network calls
        cometd.subscribe = cometdSubscribeMock;
        cometd.handshake = cometdHandshakeMock;
        jsforce.login = jsforceLoginMock;

        // Haven't subscribed yet, so no handshake should have occurred.
        expect(cometdHandshakeMock.mock.calls.length).toBe(0);

        await client.subscribe(channels[0], emptyCallback, emptyCallback);

        // Subscribed, so a handshake should have occurred.
        expect(cometdHandshakeMock.mock.calls.length).toBe(1);

        await client.subscribe(channels[1], emptyCallback, emptyCallback);
        await client.subscribe(channels[2], emptyCallback, emptyCallback);

        // Count should still be 1 after subsequent subscriptions.
        expect(cometdHandshakeMock.mock.calls.length).toBe(1);
    });

    test('Should call ClientD.subscribe once when calling subscribe', async () => {
        const cometdSubscribeMock = cometd_subscribe_mock();
        const jsforceLoginMock = jsforce_login_mock();
        const cometdHandshakeMock = cometd_handshake_mock();

        // Mock these methods as we don't want to be making network calls
        cometd.subscribe = cometdSubscribeMock;
        cometd.handshake = cometdHandshakeMock;
        jsforce.login = jsforceLoginMock;

        await client.subscribe(channels[0], emptyCallback, emptyCallback);

        const firstArgument = cometdSubscribeMock.mock.calls[0][0];
        const secondArgument = cometdSubscribeMock.mock.calls[0][1];
        const thirdArgument = cometdSubscribeMock.mock.calls[0][2];

        expect(cometdSubscribeMock.mock.calls.length).toBe(1);
        expect(firstArgument).toBe(channels[0]);
        expect(secondArgument).toBe(emptyCallback);
        expect(thirdArgument).toBe(emptyCallback);
    });

    test('Should call ClientD.disconnect once when calling disconnect', () => {
        const mockDisconnect = cometd_disconnect_mock();
        cometd.disconnect = mockDisconnect;

        client.disconnect(emptyCallback);

        const firstArgument = mockDisconnect.mock.calls[0][0];

        expect(mockDisconnect.mock.calls.length).toBe(1);
        expect(firstArgument).toBe(emptyCallback);
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
            await client.subscribe(channels[0], emptyCallback, emptyCallback);
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
            await client.subscribe(channels[0], emptyCallback);
        } catch(e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    test('Should send an object when failing to subscribe to a channel', async () => {
        // simulate a failed subscription
        const cometdSubscribeMock = cometd_subscribe_mock(false);
        const jsforceLoginMock = jsforce_login_mock();
        const cometdHandshakeMock = cometd_handshake_mock();

        // Mock these methods as we don't want to be making network calls
        cometd.subscribe = cometdSubscribeMock;
        cometd.handshake = cometdHandshakeMock;
        jsforce.login = jsforceLoginMock;

        const subscribeCallback = jest.fn();

        await client.subscribe(channels[0], emptyCallback, subscribeCallback);

        const actual = subscribeCallback.mock.calls[0][0];

        const expected = {
            successful: false,
            subscription: channels[0]
        };

        expect(subscribeCallback.mock.calls.length).toBe(1);
        expect(actual).toEqual(expected);

    });

    test('Should only subscribe to a channel if no subscription exists', async () => {  
        const cometdSubscribeMock = cometd_subscribe_mock();
        const jsforceLoginMock = jsforce_login_mock();
        const cometdHandshakeMock = cometd_handshake_mock();

        // Mock these methods as we don't want to be making network calls
        cometd.subscribe = cometdSubscribeMock;
        cometd.handshake = cometdHandshakeMock;
        jsforce.login = jsforceLoginMock;

        await client.subscribe(channels[0], emptyCallback, emptyCallback);
        await client.subscribe(channels[0], emptyCallback, emptyCallback);

        expect(client.hasSubscription(channels[0])).toBeTruthy();

        // even though we called SFDCClient.subscribe twice, CometD.subscribe should have only been called once.
        expect(cometdSubscribeMock.mock.calls.length).toBe(1);
    });

});