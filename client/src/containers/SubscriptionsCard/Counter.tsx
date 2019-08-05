import React from 'react';

import { Badge } from '../../design-system/components';

interface ICounterProps {
	count?: number
}

const CounterProps: React.FC<ICounterProps> = ({count}) => (
	<Badge
		className="u-ml-half"
		outline
		heavy
		small>
		{count}
	</Badge>
);

CounterProps.defaultProps = {
	count: 0
};

export default CounterProps;