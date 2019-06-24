require('cometd-nodejs-client').adapt();
const cometdLib = require('cometd');
const jsforceLib = require('jsforce');

/**
 * Facilitates the process of subscribing to
 * Salesforce Platform Events by logging into Salesforce
 * and shaking hands with the CometD server for long-polling.
 */
class SFDCClient {

    constructor(cliendId, clientSecret, username, password, apiVersion) {

        this.cometd = new cometdLib.CometD();
        this.jsforce = new jsforceLib.Connection({
            oauth2 : { 
                CLIENT_ID: cliendId,
                CLIENT_SECRET: clientSecret
            }
        });
    
        this.username = username;
        this.password = password;
        this.apiVersion = apiVersion;

        this.handshakeCount = 0;
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
     * @throws Will throw an Error if unable to subscribe to channel.
     */
    async subscribe(channel, callback, subscribeCallback) {
        const didNotShakeHands = this.handshakeCount === 0;

        if(didNotShakeHands) {
            await this._handshake();
        }

        await this.cometd.subscribe(channel, callback, subscribeCallback);
    }

    /**
     * Establishes long-polling with the Salesforce CometD server.
     * @private Should only be used by members of the class.
     * @throws Will throw an Error if unable to shake hands with CometD server.
     */
    async _handshake() {
        await this._configureCometD();

        await this.cometd.handshake(({successful}) => {
            const didFailToShakeHands = !successful;
            if (didFailToShakeHands) {
                throw new Error('Failed to shake hands with the Salesforce CometD server.');
            }

            console.log('Successfully shook hands with the Salesforce CometD server.');
        });

        this.handshakeCount++;
    }

    /**
     * Configures a connection to the Salesforce CometD
     * server, using an access token and instance url.
     * @private Should only be used by members of the class.
     */
    async _configureCometD() {
        const { accessToken, instanceUrl } = await this._login();
        this.cometd.configure({
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
        const { username, password } = this;

        await this.jsforce.login(username, password, (err) => {
            if (err) { 
                console.log('Failed to log into Salesforce.');
                throw new Error(err);
            }

            console.log('Successfully logged into Salesforce.');
        });

        return this.jsforce;
    }

}

module.exports = SFDCClient;