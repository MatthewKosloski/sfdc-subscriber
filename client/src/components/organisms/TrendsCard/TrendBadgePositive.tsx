import React from 'react';

import { ReactComponent as ArrowUp } from './TrendBadge/trendArrowUp.svg';
import TrendBadge, { ITrendBadgeProps } from './TrendBadge';

interface TrendBadgePositiveProps extends ITrendBadgeProps {}

const TrendBadgePositive: React.FC<TrendBadgePositiveProps> = (props) => (
	<TrendBadge
		{...props}
		variant="successLight"
		svg={<ArrowUp />} />
);

export default TrendBadgePositive;