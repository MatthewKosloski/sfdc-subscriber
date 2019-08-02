import React from 'react';

import { Card } from '../../../design-system/components/organisms';

interface ITimelineCard {

}

const TimelineCard: React.FC<ITimelineCard> = () => (
	<Card
		title="Timeline"
		subtitle="past 60 seconds of activity"
		sideHeaderComponent={<p className="u-m-zero">07/24/2019 14:34:56 &mdash; 07/24/2019 14:35:11</p>}
		constrictBodyHeight>
		<p>A multi-series, time series D3.js chart will go here.</p>
	</Card>
);

export default TimelineCard;