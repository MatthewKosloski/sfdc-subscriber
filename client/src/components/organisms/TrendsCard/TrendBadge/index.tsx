import React from 'react';
import Badge from './Badge';

import { IButtonProps } from '../../../../design-system/theme/buttons';

import ArrowUp from './ArrowUpIcon';

export interface ITrendBadgeProps extends IButtonProps {
	count?: string,
	svg?: JSX.Element
}

const TrendBadge: React.FC<ITrendBadgeProps> = ({svg, count , ...rest}) => (
	<Badge {...rest} heavy>{svg} {count}</Badge>
);

TrendBadge.defaultProps = {
	count: '0',
	variant: 'successLight',
	svg: <ArrowUp />
};

export default TrendBadge;