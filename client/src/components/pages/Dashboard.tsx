import React, { Fragment, FunctionComponent } from 'react';

import { DefaultTemplate, Header, TimelineCard, TrendsCard } from '../../components';
import { SubscriptionsCard, ToastContainer, EventLogSidebar } from '../../containers';

const Dashboard: FunctionComponent = () => (
	<Fragment>
		<ToastContainer />
		<DefaultTemplate
			headerComponent={<Header title="SFDC Subscriber" />}
			topComponent={<TimelineCard />}
			bottomLeftComponent={<SubscriptionsCard />}
			bottomRightComponent={<TrendsCard />}
			sidebarComponent={<EventLogSidebar />}
		/>
	</Fragment>
);

export default Dashboard;