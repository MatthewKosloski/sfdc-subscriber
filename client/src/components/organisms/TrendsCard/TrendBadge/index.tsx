import React from 'react';
import Badge from './Badge';

import { IButtonProps } from '../../../../design-system/theme/buttons';

import { ReactComponent as ArrowUp } from './trendArrowUp.svg';

export interface ITrendBadgeProps extends IButtonProps {
	count?: string,
	svg?: React.ReactElement
}

const TrendBadge: React.FC<ITrendBadgeProps> = ({svg, count , ...rest}) => (
	<Badge {...rest} heavy>{svg} {count}</Badge>
);

TrendBadge.defaultProps = {
	count: '0',
	svg: <ArrowUp />
};

export default TrendBadge;