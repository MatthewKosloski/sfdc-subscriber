import React, { Fragment } from 'react';
import uuidv1 from 'uuid/v1';

import { TextInput, Label, Button } from '../../../design-system/components';

interface ISubscriptionFormProps {}

const SubscriptionForm: React.FC<ISubscriptionFormProps> = () => {
	const textInputId: string = uuidv1();
	return (
		<Fragment>
			<Label htmlFor={textInputId}>Event API Name</Label>
			<div className="u-display-flex">
				<TextInput id={textInputId} className="u-mr-one" />
				<Button variant="success">Subscribe</Button>
			</div>
		</Fragment>
	);
};

export default SubscriptionForm;