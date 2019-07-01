require('dotenv').config();

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
	const client = new SFDCClient(CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD, API_VERSION);
	socketController(client, socket);
});