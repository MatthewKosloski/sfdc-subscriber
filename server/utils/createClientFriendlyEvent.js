/**
 * Transforms the input to a more readable object
 * to be used on the client.
 */
module.exports = ({channel, data}) => {
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