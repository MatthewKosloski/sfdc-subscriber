require('dotenv').config();
require('cometd-nodejs-client').adapt();

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cometdLib = require('cometd');
const jsforceLib = require('jsforce');

const SFDCClient = require('./modules/SFDCClient');

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

const port = 3001;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const client = new SFDCClient(cometd, jsforce, USERNAME, PASSWORD, API_VERSION);

io.on('connection', function (socket) {
  console.log('Connection to IO server established.');
  
  client.subscribe('/event/Data_Center_Name__e', (payload) => {
    socket.emit('DATA_CENTER_NAME_EVENT', {payload});
  });
});