import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';

import socketEvents from '../../socketEvents';
import Chart from '../Chart';

import './App.css';

export default class App extends Component {

	constructor(props) {
		super(props);

		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleDataCenterNameEvent = this.handleDataCenterNameEvent.bind(this);

		this.socket = io('http://localhost:3001');

		this.state = {
			data: []
		}
	}

	componentDidMount() {
		const {
			PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
			PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
			DATA_CENTER_NAME_EVENT
		} = socketEvents;
		
		this.socket.on(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS, this.handleSubscriptionSuccess);
		this.socket.on(PLATFORM_EVENT_SUBSCRIPTION_FAILURE, this.handleSubscriptionFailure);
		this.socket.on(DATA_CENTER_NAME_EVENT, this.handleDataCenterNameEvent);
	}

	/**
	 * Makes a request to the server to subscribe to the provided `cometdChannel`.
	 * If the server is able to subscribe to the channel, a `PLATFORM_EVENT_SUBSCRIPTION_SUCCESS`
	 * event will be emitted. If the server is unable to subscribe to the event, a 
	 * `PLATFORM_EVENT_SUBSCRIPTION_FAILURE` event will be emitted.  When an event occurs,
	 * a `socketEvent` event will be emitted, containing data.
	 * @param {string} cometdChannel The CometD channel to subscribe to.
	 * @param {string} socketEvent The socket event emitted when a CometD event
	 * occurs.
	 */
	createEventSubscriptionRequest(cometdChannel, socketEvent) {
		this.socket.emit(socketEvents.PLATFORM_EVENT_SUBSCRIPTION_REQUEST, 
		{payload: {cometdChannel, socketEvent}});
	}

	handleSubscriptionSuccess({payload: {subscription}}) {
		console.info(`Now subscribing to ${subscription}...`);
	}

	handleSubscriptionFailure({payload: {subscription}}) {
		console.error(`Failed to subscribe to ${subscription}.`);
	}

	handleDataCenterNameEvent({payload}) {
		this.setState({
			data: [...this.state.data, payload.data.payload]
		});
		console.log(this.state.data);
	}

	handleButtonClick() {
		this.createEventSubscriptionRequest('/event/Data_Center_Name__e',
		socketEvents.DATA_CENTER_NAME_EVENT);
	}

	render() {
		return (
			<Fragment>
				<div className="container">
					<h1>SFDC Platform Event Subscriber</h1>
					<p>Click on the button below to subscribe to the <code>Data_Center_Name__e</code> event.</p>
					<button onClick={this.handleButtonClick}>Subscribe</button>
					<Chart data={this.state.data}/>
				</div>
			</Fragment>
		);
	}
}
