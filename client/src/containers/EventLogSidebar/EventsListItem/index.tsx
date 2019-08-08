import React from 'react';

import { Titles } from '../../../design-system/components';

import { Event } from '../../../store/events/types';

import Container from './Container';
import Timestamp from './Timestamp';

interface Props extends Event {
	color: string
};

const EventsListItem: React.FC<Props> = (props) => {
	return(
		<Container>
			<Timestamp color={props.color}>{props.CreatedDate}</Timestamp>
			<Titles
				titleAs="h3"
				titleText={props.EventApiName}
				subtitleText={props.CustomFields.Log_Message__c} />
		</Container>
	);
};

export default EventsListItem;