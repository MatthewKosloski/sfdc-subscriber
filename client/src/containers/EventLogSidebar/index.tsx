import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Sidebar, DataContainer } from '../../components/organisms';
import { AppState } from '../../store';
import { EventState, Event } from '../../store/entities/events/types';
import { removeAllEvents, addEvent, removeEvent } from '../../store/entities/events/actions';

import Header from './Header';
import EventsList from './EventsList';
import EventsListItem from './EventsListItem';

export interface OwnProps {}

interface StateProps {
	events: EventState
}

interface DispatchProps {
	addEvent: typeof addEvent,
	removeEvent: typeof removeEvent,
	removeAllEvents: typeof removeAllEvents
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class EventLogSidebar extends Component<Props, State> {

	componentDidMount() {
		this.props.addEvent({
			subscriptionId: 'Dummy_Subscription_1__e',
			createdById: '0052E00000JAW4MQAX',
			createdDate: '2019-08-13T00:30:00Z',
			customFields: {
				Data_Center_Id__c: 'a032E00000xzevTQAQ',
				Name__c: 'Applied-Denver'
			}
		});
		this.props.addEvent({
			id: 'foobar123',
			subscriptionId: 'Dummy_Subscription_1__e',
			createdById: '0052E00000JAW4MQAX',
			createdDate: '2019-08-13T00:30:14Z',
			customFields: {
				Data_Center_Id__c: 'a032E00000xzevTQAQ',
				Name__c: 'Applied-Toronto'
			}
		});
		// this.props.removeEvent('foobar123');
	}

	public renderEventItem(event: Event): JSX.Element {
		return (
			<EventsListItem
				{...event}
				color="red"
				key={event.id} />
		);
	}

	public render(): JSX.Element {

		const { removeAllEvents } = this.props;

		const headerComponent: JSX.Element =
			<Header
				count={0}
				onButtonClick={removeAllEvents}
				isButtonDisabled={true} />;

		return(
			<Sidebar headerComponent={headerComponent}>
				<DataContainer
					hasData={false}
					noDataText="No Platform Events have transpired.">
					<EventsList>
						{/* {events.map((event) => {
							return this.renderEventItem(event);
						})} */}
					</EventsList>
				</DataContainer>
			</Sidebar>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	events: state.entities.events,
});

const dispatchProps: DispatchProps = {
	addEvent,
	removeEvent,
	removeAllEvents
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(EventLogSidebar);