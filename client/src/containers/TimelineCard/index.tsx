import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../store';
import { selectSubscriptions } from '../../store/entities/subscriptions/selectors';
import { Card } from '../../design-system/components';

import TimeRange from './TimeRange';
import Timeline from './Timeline';
import Legend from './Legend';
import LegendItem from './Legend/LegendItem';
import Container from './Container';
import TimelineCardColumn from './TimelineCardColumn';
import TimelineCardRow from './TimelineCardRow';
import { Subscription } from '../../store/entities/subscriptions/types';

export interface OwnProps {}

interface StateProps {
	subscriptions: Subscription[]
}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class TimelineCard extends Component<Props, State> {

	public renderLegendItem({color, eventApiName}: Subscription): JSX.Element {
		return (
			<LegendItem circleColor={color as string}>
				{eventApiName}
			</LegendItem>
		);
	}

	public render() {

		const { subscriptions } = this.props;

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
								{subscriptions.map((subscription) =>
									this.renderLegendItem(subscription)
								)}
							</Legend>
						</TimelineCardColumn>
						<TimelineCardColumn>
							<Timeline />
						</TimelineCardColumn>
					</TimelineCardRow>
				</Container>
			</Card>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	subscriptions: selectSubscriptions(state)
});

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps
)(TimelineCard);