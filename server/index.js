require('dotenv').config();
require('cometd-nodejs-client').adapt();

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cometdLib = require('cometd');
const jsforceLib = require('jsforce');

const SFDCClient = require('./modules/SFDCClient');

const socketController = require('./socketController');

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
	// const cometd = new cometdLib.CometD();
	// const jsforce = new jsforceLib.Connection({
	// 	oauth2 : {
	// 		CLIENT_ID: CLIENT_ID,
	// 		CLIENT_SECRET: CLIENT_SECRET
	// 	}
	// });

	// const client = new SFDCClient(cometd, jsforce, USERNAME, PASSWORD, API_VERSION, true);
	// socketController(client, socket);
	socket.on('PLATFORM_EVENT_SUBSCRIPTION_REQUEST', (data) => {
		console.log('got a subscription request', data);
		console.log('will send back success');
		socket.emit('PLATFORM_EVENT_SUBSCRIPTION_SUCCESS', {
			payload: {
				successful: true,
				subscription: data.payload.cometdChannel
			}
		});
	});
});