import React, { Fragment, FunctionComponent } from 'react';

import { Header, TimelineCard, TrendsCard } from '../../components';
import { SubscriptionsCard, ToastContainer, EventLogSidebar } from '../../containers';

import { DefaultTemplate } from '../templates';

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