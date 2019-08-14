import React from 'react';

import { Card } from '../../../design-system/components';
import { Column, Row } from '../../../design-system/layout';

import TimeRange from './TimeRange';
import Timeline from './Timeline';
import Legend from './Legend';
import LegendItem from './Legend/LegendItem';

interface ITimelineCard {}

const TimelineCard: React.FC<ITimelineCard> = () => (
	<Card
		titleText="Timeline"
		subtitleText="past 60 seconds of activity"
		sideHeaderComponent={<TimeRange />}
		headerHasSpaceBetween
		noPaddedBody>
		<Row>
			<Column sizes={[['SM', 12], ['MD', 6]]}>
				<Legend>
					<LegendItem circleColor="red">Data_Center_Name__e</LegendItem>
					<LegendItem>Client_Health_Change__e</LegendItem>
					<LegendItem>Expired_Certificate__e</LegendItem>
				</Legend>
			</Column>
			<Column sizes={[['SM', 12], ['MD', 6]]}>
				<Timeline />
			</Column>
		</Row>
	</Card>
);

export default TimelineCard;