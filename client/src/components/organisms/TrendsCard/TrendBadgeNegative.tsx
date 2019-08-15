import React from 'react';

import ArrowDown from './TrendBadge/ArrowDownIcon';
import TrendBadge, { ITrendBadgeProps } from './TrendBadge';

interface ITrendBadgeNegativeProps extends ITrendBadgeProps {}

const TrendBadgeNegative: React.FC<ITrendBadgeNegativeProps> = (props) => (
	<TrendBadge
		{...props}
		variant="dangerLight"
		svg={<ArrowDown />} />
);

export default TrendBadgeNegative;