require('cometd-nodejs-client').adapt();

/**
 * Facilitates the process of subscribing and unsubscribing
 * to Salesforce Platform Events by logging into Salesforce
 * and shaking hands with the CometD server for long-polling.
 */
class SFDCClient {

    constructor(cometd, jsforce, username, password, apiVersion, isDebugMode = false) {
        this._log('Creating a new instance of SFDCClient for a socket.');

        this._cometd = cometd;
        this._jsforce = jsforce;
        this._username = username;
        this._password = password;
        this._apiVersion = apiVersion;
        this._isDebugMode = isDebugMode;
        this._didShakeHands = false;
        this._subscriptions = {};
    }

    /**
     * A wrapper for CometD.subscribe. Performs a handshake if
     * necessary.
     * @public Can be used by API consumers.
     * @param {string} channel The cometd channel to subscribe to. If subscribing
     * to Salesforce Platform Events, the channel name is `/event/My_Event__e`.
     * @param {function} callback The callback to call when a message is received.
     * @param {function} subscribeCallback The callback that is called when the
     * subscription is acknowledged.
     * @throws Will throw an Error if attempting to subscribe to a channel more than once.
     * @throws Will throw an Error if unable to handshake with CometD.
     * @throws Will throw an Error if unable to log into SFDC.
     */
    async subscribe(channel, callback, subscribeCallback) {
        this._log('SFDCClient.subscribe');

        const didNotShakeHands = !this._didShakeHands;

        if(didNotShakeHands) {
            await this._handshake();
        }

        if(this.hasSubscription(channel)) {
            throw new Error(`Cannot subscribe to ${channel} because a subscription for that channel already exists.`);
        }

        this._subscriptions[channel] = this._cometd.subscribe(
            channel, callback, subscribeCallback);
    }

    /**
     * A wrapper for CometD.unsubscribe. Unsubscribes from a channel.
     * @public Can be used by API consumers.
     * @param {string} channel The channel to unsubscribe from. 
     * @param {function} unsubscribeCallback The callback to invoke when 
     * an unsubscription occurs.
     * @throws Will thrown an Error if trying to unsubscribe from a channel
     * that has no subscription.
     */
    unsubscribe(channel, unsubscribeCallback) {
        this._log('SFDCClient.unsubscribe');

        const hasNoSubscription = !this.hasSubscription(channel);

        if(hasNoSubscription) {
            throw new Error(`Cannot unsubscribe from ${channel} because no subscription to that channel exists.`);
        } 

        const subscription = this._subscriptions[channel];

        this._cometd.unsubscribe(subscription, (unsubscribeReply) => {
            if(unsubscribeReply.successful) {
                delete this._subscriptions[channel];
            }
            unsubscribeCallback(unsubscribeReply);
        });
    }

    /**
     * A wrapper for CometD.disconnect.
     * @public Can be used by API consumers.
     * @param {function} disconnectCallback Function to be invoked to acknowledge disconnect.
     */
    disconnect(disconnectCallback) {
        this._log('SFDCClient.disconnect');
        this._cometd.disconnect(disconnectCallback);
    }

    /**
     * Indicates if there is a subscription to the channel.
     * @public Can be used by API consumers.
     * @param {string} channel The channel to use for the subscription check. 
     */
    hasSubscription(channel) {
        this._log('SFDCClient.hasSubscription');
        return this._subscriptions[channel] !== undefined;
    }

    /**
     * Establishes long-polling with the Salesforce CometD server.
     * @private Should only be used by members of the class.
     * @throws Will throw an Error if unable to shake hands with CometD server.
     */
    async _handshake() {
        this._log('SFDCClient._handshake');
        await this._configureCometD();

        await this._cometd.handshake(({successful}) => {
            const didFailToShakeHands = !successful;
            if (didFailToShakeHands) {
                throw new Error('Failed to shake hands with the Salesforce CometD server.');
            }

            this._log('Successfully shook hands with the Salesforce CometD server.');
        });

        this._didShakeHands = true;
    }

    /**
     * Configures a connection to the Salesforce CometD
     * server, using an access token and instance url.
     * @private Should only be used by members of the class.
     */
    async _configureCometD() {
        this._log('SFDCClient._configureCometD');
        const { accessToken, instanceUrl } = await this._login();
        this._cometd.configure({
            url: `${instanceUrl}/cometd/${this.apiVersion}/`,
            appendMessageTypeToURL: false,
            requestHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    /**
     * Logs into Salesforce using Username-Password OAuth flow
     * to get an access token and instance url for the CometD
     * handshake.
     * @private Should only be used by members of the class.
     * @throws Will throw an Error if unable to login to Salesforce.
     * @returns jsforce.Connection
     * 
     */
    async _login() {
        this._log('SFDCClient._login');
        const { _username, _password } = this;

        await this._jsforce.login(_username, _password, (err) => {
            if (err) { 
                this._log('Failed to log into Salesforce.');
                throw new Error(err);
            }

            this._log('Successfully logged into Salesforce.');
        });

        return this._jsforce;
    }

    /**
     * Logs a message to the console if in debug mode.
     * @param {any} message The message to log to console. 
     */
    _log(message) {
        if(this._isDebugMode) {
            console.log(message);
        }
    }

}

module.exports = SFDCClient;