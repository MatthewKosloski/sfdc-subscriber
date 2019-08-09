import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Sidebar, DataContainer } from '../../components/organisms';
import { AppState } from '../../store';
import { Event } from '../../store/events/types';
import { Subscription } from '../../store/subscriptions/types';
import { removeAllEvents } from '../../store/events/actions';

import Header from './Header';
import EventsList from './EventsList';
import EventsListItem from './EventsListItem';

export interface OwnProps {}

interface StateProps {
	events: Event[]
	subscriptions: Subscription[]
}

interface DispatchProps {
	removeAllEvents: typeof removeAllEvents
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class EventLogSidebar extends Component<Props, State> {

	/**
	 * Returns the color of the subscription corresponding to the event
	 * associated with a particular API name.
	 * @param eventApiName
	 */
	public getEventColor(eventApiName: string) {
		const { subscriptions } = this.props;
		const subscription: Subscription = subscriptions
			.filter((subscription: Subscription) => subscription.eventApiName === eventApiName)[0];

		return subscription.color;
	}

	public renderEventItem(event: Event): JSX.Element {
		return (
			<EventsListItem
				{...event}
				color={this.getEventColor(event.eventApiName)}
				key={event.uuid} />
		);
	}

	public render(): JSX.Element {

		const { events, removeAllEvents } = this.props;

		const headerComponent: JSX.Element =
			<Header
				count={events.length}
				onButtonClick={removeAllEvents}
				isButtonDisabled={events.length === 0} />;

		return(
			<Sidebar headerComponent={headerComponent}>
				<DataContainer
					hasData={events.length > 0}
					noDataText="No Platform Events have transpired.">
					<EventsList>
						{events.map((event) => {
							return this.renderEventItem(event);
						})}
					</EventsList>
				</DataContainer>
			</Sidebar>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	events: state.events,
	subscriptions: state.subscriptions
});

const dispatchProps: DispatchProps = {
	removeAllEvents
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(EventLogSidebar);