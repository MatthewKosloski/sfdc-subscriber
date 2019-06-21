require('cometd-nodejs-client').adapt();
const cometdLib = require('cometd');
const jsforceLib = require('jsforce');

const SFDCClient = require('./SFDCClient');

describe('SFDCClient', () => {

    const buildSubscriptionMock = (isFailedSubscription = false) => {
        const implementation = (channel, _, resCallback) => {
            const typeOfLogin = isFailedSubscription ? 'unsuccessful' : 'successful';
            const fakeResponse = {successful: !isFailedSubscription, subscription: channel};

            console.log(`Simulating a(n) ${typeOfLogin} subscription to channel ${channel}.`);
            resCallback(fakeResponse);
        };

        return jest.fn(implementation);
    };

    const buildHandshakeMock = (isFailedHandshake = false) => {
        const implementation = (callback) => {
            const typeOfHandshake = isFailedHandshake ? 'unsuccessful' : 'successful';
            const fakeResponse = {successful: !isFailedHandshake};

            console.log(`Simulating a(n) ${typeOfHandshake} handshake with the CometD server.`);
            callback(fakeResponse);
        };

        return jest.fn(implementation);
    };

    const buildLoginMock = (isFailedLogin = false, accessToken = '', instanceUrl = '') => {

        const err = new Error('Fake error about failing to login');

        const implementation = (username, password, callback) => {
            const typeOfLogin = isFailedLogin ? 'unsuccessful' : 'successful';
            const fakeResponse = {accessToken, instanceUrl};

            console.log(`Simulating a(n) ${typeOfLogin} login with Salesforce with username \"${username}\" and password \"${password}\".`);
            callback(isFailedLogin ? err : null);

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

    const cometd = new cometdLib.CometD();
    const jsforce = new jsforceLib.Connection({
        oauth2 : { clientId, clientSecret }
    });

    let client;

    beforeEach(() => {
        client = new SFDCClient(cometd, jsforce, username, password, apiVersion);
    });

    test('Should set instance variables', () => {

        expect(client.cometd).toBe(cometd);
        expect(client.jsforce).toBe(jsforce);
        expect(client.username).toBe(username);
        expect(client.password).toBe(password);
        expect(client.apiVersion).toBe(apiVersion);
    });

    test('Should only handshake with CometD when subscribing for the first time', async () => {

        const [firstChannelName, secondChannelName, thirdChannelName] = channels;
        const { cometd, jsforce } = client;

        // Mock these methods as we don't want to be making network calls
        cometd.subscribe = buildSubscriptionMock();
        jsforce.login = buildLoginMock();
        cometd.handshake = buildHandshakeMock();

        // Haven't subscribed yet, so no handshake should have occurred.
        expect(client.handshakeCount).toBe(0);

        await client.subscribe(firstChannelName, emptyCallback);

        // Subscribed, so a handshake should have occurred.
        expect(client.handshakeCount).toBe(1);

        await client.subscribe(secondChannelName, emptyCallback);
        await client.subscribe(thirdChannelName, emptyCallback);

        // Count should still be 1 after subsequent subscriptions.
        expect(client.handshakeCount).toBe(1);
    });

    test('Should call ClientD.subscribe with channel and callback when subscribing', async () => {

        const [channelName,,] = channels;

        // Mock these methods as we don't want to be making network calls
        const mockSubscribe = buildSubscriptionMock();
        client.cometd.subscribe = mockSubscribe;
        client.jsforce.login = buildLoginMock();
        client.cometd.handshake = buildHandshakeMock();

        await client.subscribe(channelName, emptyCallback);

        const firstArgument = mockSubscribe.mock.calls[0][0];
        const secondArgument = mockSubscribe.mock.calls[0][1];

        expect(mockSubscribe.mock.calls.length).toBe(1);
        expect(firstArgument).toBe(channelName);
        expect(secondArgument).toBe(emptyCallback);
    });

    test('Should throw Error when failing to login with Salesforce', async () => {

        // Mock these methods as we don't want to be making network calls
        client.cometd.subscribe = buildSubscriptionMock();
        client.jsforce.login = buildLoginMock(true);
        client.cometd.handshake = buildHandshakeMock();

        try {
            await client.subscribe(channels[0], emptyCallback);
        } catch(e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    test('Should throw Error when failing to handshake with the Salesforce CometD server', async () => {

        // Mock these methods as we don't want to be making network calls
        client.cometd.subscribe = buildSubscriptionMock();
        client.jsforce.login = buildLoginMock();
        client.cometd.handshake = buildHandshakeMock(true);

        try {
            await client.subscribe(channels[0], emptyCallback);
        } catch(e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    test('Should throw Error when failing to subscribe to channel', async () => {
        
        // Mock these methods as we don't want to be making network calls
        client.cometd.subscribe = buildSubscriptionMock(true);
        client.jsforce.login = buildLoginMock();
        client.cometd.handshake = buildHandshakeMock();

        try {
            await client.subscribe(channels[0], emptyCallback);
        } catch(e) {
            expect(e).toBeInstanceOf(Error);
        }

    });

});