import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../store';
import { selectSubscriptions, selectSubscriptionColorById } from '../../store/entities/subscriptions/selectors';
import { selectLastEventId, selectLastEvent, selectEventCreatedDateById , selectLastEventSubscriptionId} from '../../store/entities/events/selectors';
import { Subscription } from '../../store/entities/subscriptions/types';
import { Card } from '../../design-system/components';

import TimeRange from './TimeRange';
import Timeline from './Timeline';
import Legend from './Legend';
import LegendItem from './Legend/LegendItem';
import Container from './Container';
import TimelineCardColumn from './TimelineCardColumn';
import TimelineCardRow from './TimelineCardRow';

export interface OwnProps {}

interface StateProps {
	subscriptions: Subscription[] | null,
	lastEvent: {
		createdDate: string | null
		color: string | null
	}
}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class TimelineCard extends Component<Props, State> {

	public renderLegendItem({color, eventApiName}: Subscription): JSX.Element {
		return (
			<LegendItem key={eventApiName} circleColor={color as string}>
				{eventApiName}
			</LegendItem>
		);
	}

	public render() {

		const { subscriptions, lastEvent } = this.props;

		return(
			<Card
				titleText="Timeline"
				subtitleText="past 60 seconds of activity"
				sideHeaderComponent={<TimeRange />}
				headerHasSpaceBetween
				noPaddedBody>
				<Container>
					<TimelineCardRow>
						<TimelineCardColumn>
							<Legend>
								{subscriptions && subscriptions.map((subscription) =>
									this.renderLegendItem(subscription)
								)}
							</Legend>
						</TimelineCardColumn>
						<TimelineCardColumn>
							<Timeline lastEvent={lastEvent}/>
						</TimelineCardColumn>
					</TimelineCardRow>
				</Container>
			</Card>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	subscriptions: selectSubscriptions(state),
	lastEvent: {
		createdDate: selectEventCreatedDateById(state, selectLastEventId(state)),
		color: selectSubscriptionColorById(state, selectLastEventSubscriptionId(state))
	}
});

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps
)(TimelineCard);