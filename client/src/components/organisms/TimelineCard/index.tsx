import React from 'react';

import { Card } from '../../../design-system/components';

import TimeRange from './TimeRange';
import Timeline from './Timeline';

interface ITimelineCard {}

const TimelineCard: React.FC<ITimelineCard> = () => (
	<Card
		titleText="Timeline"
		subtitleText="past 60 seconds of activity"
		sideHeaderComponent={<TimeRange />}
		headerHasSpaceBetween>
		<Timeline />
	</Card>
);

export default TimelineCard;