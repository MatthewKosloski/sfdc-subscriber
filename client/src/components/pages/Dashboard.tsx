import React, { Fragment, FunctionComponent } from 'react';

import { DefaultTemplate, Header } from '../../components';
import { SubscriptionsCard, ToastContainer, TimelineCard, EventLogSidebar } from '../../containers';

const Dashboard: FunctionComponent = () => (
	<Fragment>
		<ToastContainer />
		<DefaultTemplate
			headerComponent={<Header title="SFDC Subscriber" />}
			topComponent={<TimelineCard />}
			bottomLeftComponent={<SubscriptionsCard />}
			// bottomRightComponent={<TrendsCard />}
			sidebarComponent={<EventLogSidebar />}
		/>
	</Fragment>
);

export default Dashboard;