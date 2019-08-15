import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Sidebar, DataContainer } from '../../components/organisms';
import { AppState } from '../../store';
import { Event } from '../../store/entities/events/types';
import { removeAllEvents, addEvent, removeEvent } from '../../store/entities/events/actions';

import Header from './Header';
import EventsList from './EventsList';
import EventsListItem from './EventsListItem';
import { selectEvents } from '../../store/entities/events/selectors';

export interface OwnProps {}

interface StateProps {
	events: Event[]
}

interface DispatchProps {
	addEvent: typeof addEvent,
	removeEvent: typeof removeEvent,
	removeAllEvents: typeof removeAllEvents
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class EventLogSidebar extends Component<Props, State> {

	public renderEventItem(event: Event): JSX.Element {
		return (
			<EventsListItem key={event.id} {...event} />
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
						{events.map((event) =>
							this.renderEventItem(event)
						)}
					</EventsList>
				</DataContainer>
			</Sidebar>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	events: selectEvents(state)
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