import uuidv1 from 'uuid/v1';
import { Event } from '../store/entities/events/types';

type Type = {channel: any, data: any};

export default ({channel, data}: Type): Event => {
	const { CreatedById: createdById,
		CreatedDate: createdDate, ...customFields } = data.payload;

	const eventApiName = channel.replace('/event/', '');

	return {
		id: uuidv1(),
		eventApiName,
		createdById,
		createdDate,
		customFields: {
			...customFields
		}
	};
}