require('dotenv').config();
require('cometd-nodejs-client').adapt();

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cometdLib = require('cometd');
const jsforceLib = require('jsforce');

const {
	PLATFORM_EVENT,
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
	PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE,
	COMETD_HANDSHAKE_SUCCESS,
	COMETD_HANDSHAKE_FAILURE,
	SALESFORCE_LOGIN_SUCCESS,
	SALESFORCE_LOGIN_FAILURE
} = require('../common/socketEvents');

const { createClientFriendlyEvent } = require('./utils');

const { DISCONNECT } = require('./socketEvents');
const { SFDCClient, SocketController } = require('./modules');

const {
	SFDC_SUBSCRIBER_CLIENT_ID: CLIENT_ID,
	SFDC_SUBSCRIBER_CLIENT_SECRET: CLIENT_SECRET,
	SFDC_SUBSCRIBER_USERNAME: USERNAME,
	SFDC_SUBSCRIBER_PASSWORD: PASSWORD,
	SFDC_SUBSCRIBER_API_VERSION: API_VERSION } = process.env;

const port = process.env.PORT || 3001;

server.listen(port, () => {
	console.log(`Express server running at http://localhost:${port}/`);
});

io.on('connection', (socket) => {
	const cometd = new cometdLib.CometD();
	const jsforce = new jsforceLib.Connection({
		oauth2 : {
			CLIENT_ID: CLIENT_ID,
			CLIENT_SECRET: CLIENT_SECRET
		}
	});

	// Create a new instance of SFDCClient to facilitate
	// communication with Salesforce.
	const sfdcClient = new SFDCClient(cometd, jsforce, USERNAME, PASSWORD, API_VERSION, true);

	// Create a new instance of SocketController to facilitate
	// communication with the client web app over web sockets.
	const socketController = new SocketController(sfdcClient, socket, PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
		PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST, DISCONNECT);

	sfdcClient.onSuccessfulLogin = () => {
		console.log(`Socket ${socket.id} successfully logged into Salesforce using jsforce.`);
		socket.emit(SALESFORCE_LOGIN_SUCCESS);
	};

	sfdcClient.onFailedLogin = () => {
		console.log(`Socket ${socket.id} failed to log into Salesforce using jsforce.`);
		socket.emit(SALESFORCE_LOGIN_FAILURE);
	};

	sfdcClient.onSuccessfulHandshake = () => {
		console.log(`Socket ${socket.id} successfully shook hands with the Salesforce CometD server.`);
		socket.emit(COMETD_HANDSHAKE_SUCCESS);
	};

	sfdcClient.onFailedHandshake = () => {
		console.log(`Socket ${socket.id} failed to shake hands with the Salesforce CometD server.`);
		socket.emit(COMETD_HANDSHAKE_FAILURE);
	};

	socketController.onEvent = (eventData) => {
		console.log(`Sent a ${eventData.channel} event to socket ${socket.id}.`);
		socket.emit(PLATFORM_EVENT, createClientFriendlyEvent(eventData));
	};

	socketController.onSuccessfulSubscription = (data) => {
		console.log(`Socket ${socket.id} successfully subscribed to ${data.cometdChannel}!`);
		socket.emit(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS, data);
	};

	socketController.onFailedSubscription = (data) => {
		console.log(`Socket ${socket.id} failed to subscribe to ${data.cometdChannel}.`);
		socket.emit(PLATFORM_EVENT_SUBSCRIPTION_FAILURE, data);
	};

	socketController.onSuccessfulUnsubscription = (data) => {
		console.log(`Socket ${socket.id} successfully unsubscribed from the CometD channel.`);
		socket.emit(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, data);
	};

	socketController.onFailedUnsubscription = (data) => {
		console.log(`Socket ${socket.id} failed to unsubscribe from the CometD channel.`);
		socket.emit(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE, data);
	};

	socketController.onSuccessfulCometdDisconnect = () => {
		console.log(`Socket ${socket.id} successfully disconnected from CometD.`);
	};

	socketController.onFailedCometdDisconnect = () => {
		console.log(`Socket ${socket.id} failed to disconnect from CometD.`);
	};

});