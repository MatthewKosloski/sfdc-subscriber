import { Event } from '../store/entities/events/types';

type Type = {channel: any, data: any};

export default ({channel, data}: Type): Event => {
	const { CreatedById: createdById,
		CreatedDate: createdDate, ...customFields } = data.payload;

	const subscriptionId = channel.replace('/event/', '');

	return {
		subscriptionId,
		createdById,
		createdDate,
		customFields: {
			...customFields
		}
	};
}