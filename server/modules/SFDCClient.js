/**
 * Facilitates the process of subscribing to
 * Salesforce Platform Events by logging into Salesforce
 * and shaking hands with the CometD server for long-polling.
 */
class SFDCClient {

    constructor(cometd, jsforce, username, password, apiVersion) {

        this.cometd = cometd;
        this.jsforce = jsforce;
        this.username = username;
        this.password = password;
        this.apiVersion = apiVersion;

        this.handshakeCount = 0;
    }

    /**
     * A wrapper for CometD.subscribe. Performs a handshake if
     * necessary.
     * @public Can be used by API consumers.
     * @throws Will throw an Error if unable to subscribe to channel.
     */
    async subscribe(channel, callback) {
        const didNotShakeHands = this.handshakeCount === 0;

        if(didNotShakeHands) {
            await this._handshake();
        }

        await this.cometd.subscribe(channel, callback, 
            (res) => {
                if(res.successful) {
                    console.log(`Now subscribing to ${res.subscription}...`);
                } else {
                    throw new Error(`Failed to subscribe to ${res.subscription}.`);
                }
            }
        );
    }

    /**
     * Establishes long-polling with the Salesforce CometD server.
     * @private Should only be used by members of the class.
     * @throws Will throw an Error if unable to shake hands with CometD server.
     */
    async _handshake() {
        await this._configureCometD();

        await this.cometd.handshake((res) => {
            const didFailToShakeHands = !res.successful;
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