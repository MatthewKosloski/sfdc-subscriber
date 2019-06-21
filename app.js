require('dotenv').config();
require('cometd-nodejs-client').adapt();
const cometdLib = require('cometd');
const jsforceLib = require('jsforce');

const SFDCClient = require('./src/modules/SFDCClient');

const { 
    SFDC_SUBSCRIBER_CLIENT_ID: CLIENT_ID, 
    SFDC_SUBSCRIBER_CLIENT_SECRET: CLIENT_SECRET, 
    SFDC_SUBSCRIBER_USERNAME: USERNAME, 
    SFDC_SUBSCRIBER_PASSWORD: PASSWORD, 
    SFDC_SUBSCRIBER_API_VERSION: API_VERSION } = process.env;

const cometd = new cometdLib.CometD();
const jsforce = new jsforceLib.Connection({
        oauth2 : { CLIENT_ID, CLIENT_SECRET }
});

const client = new SFDCClient(cometd, jsforce, USERNAME, PASSWORD, API_VERSION);

client.subscribe('/event/Data_Center_Name__e', ({data, channel} = res) => {
    console.log(`Received data from ${channel}:`);
    console.log(data);
});