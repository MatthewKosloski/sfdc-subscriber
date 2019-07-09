import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';

import socketEvents from '../../socketEvents';
// import Chart from '../Chart';

import './App.css';

const {
	PLATFORM_EVENT_SUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_SUBSCRIPTION_FAILURE,
	PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS,
	PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE,
	PLATFORM_EVENT_SUBSCRIPTION_REQUEST,
	PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST,
	DATA_CENTER_NAME_EVENT,
} = socketEvents;

export default class App extends Component {

	constructor(props) {
		super(props);

		this.handleSocketEvent = this.handleSocketEvent.bind(this);
		this.handleSubscribe = this.handleSubscribe.bind(this);
		this.handleUnsubscribe = this.handleUnsubscribe.bind(this);

		this.socket = io('http://localhost:3001');
	}

	componentDidMount() {
		this.socket.on(PLATFORM_EVENT_SUBSCRIPTION_SUCCESS, this.handleSubscriptionSuccess);
		this.socket.on(PLATFORM_EVENT_SUBSCRIPTION_FAILURE, this.handleSubscriptionFailure);
		this.socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_SUCCESS, this.handleUnsubscriptionSuccess);
		this.socket.on(PLATFORM_EVENT_UNSUBSCRIPTION_FAILURE, this.handleUnsubscriptionFailure);
		this.socket.on(DATA_CENTER_NAME_EVENT, this.handleSocketEvent);
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
		this.socket.emit(PLATFORM_EVENT_SUBSCRIPTION_REQUEST, 
		{payload: {cometdChannel, socketEvent}});
	}

	createEventUnsubscriptionRequest(cometdChannel) {
		this.socket.emit(PLATFORM_EVENT_UNSUBSCRIPTION_REQUEST,
		{payload: {cometdChannel}});
	}

	handleSubscriptionSuccess({payload: {subscription}}) {
		console.info(`Now subscribing to ${subscription}...`);
	}

	handleSubscriptionFailure({payload: {subscription}}) {
		console.error(`Failed to subscribe to ${subscription}.`);
	}

	handleUnsubscriptionSuccess({payload: {subscription}}) {
		console.info(`Successfully unsubscribed from ${subscription}.`);
	}

	handleUnsubscriptionFailure({payload: {subscription}}) {
		console.error(`Failed to unsubscribe from ${subscription}.`);
	}

	handleSocketEvent({payload}) {
		console.log(payload);
	}

	handleSubscribe() {
		this.createEventSubscriptionRequest('/event/Data_Center_Name__e',
		DATA_CENTER_NAME_EVENT);
	}

	handleUnsubscribe() {
		this.createEventUnsubscriptionRequest('/event/Data_Center_Name__e');
	}

	render() {
		return (
			<Fragment>
				<div className="container">
					<h1>SFDC Platform Event Subscriber</h1>
					<p>Controls for Data_Center_Name__e.</p>
					<button onClick={this.handleSubscribe}>Subscribe</button>
					<button onClick={this.handleUnsubscribe}>Unsubscribe</button>
					{/* <Chart data={this.state.data}/> */}
				</div>
			</Fragment>
		);
	}
}
