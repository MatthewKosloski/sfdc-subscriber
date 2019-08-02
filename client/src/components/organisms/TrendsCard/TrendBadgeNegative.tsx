import React from 'react';

import { ReactComponent as ArrowDown } from './TrendBadge/trendArrowDown.svg';
import TrendBadge, { ITrendBadgeProps } from './TrendBadge';

interface ITrendBadgeNegativeProps extends ITrendBadgeProps {}

const TrendBadgeNegative: React.FC<ITrendBadgeNegativeProps> = (props) => (
	<TrendBadge
		{...props}
		variant="dangerLight"
		svg={<ArrowDown />} />
);

export default TrendBadgeNegative;