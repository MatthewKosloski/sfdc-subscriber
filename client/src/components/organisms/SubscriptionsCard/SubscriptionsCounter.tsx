import React from 'react';

import { Badge } from '../../../design-system/components';

interface ISubscriptionsCounter {}

const SubscriptionsCounter: React.FC<ISubscriptionsCounter> = () => (
	<Badge
		className="u-ml-half"
		outline
		heavy
		small>
		7
	</Badge>
);

export default SubscriptionsCounter;