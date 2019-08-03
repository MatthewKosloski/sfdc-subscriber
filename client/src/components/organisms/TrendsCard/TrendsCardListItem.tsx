import React, { Fragment } from 'react';

import { CardListItem } from '../../molecules';
import { ICardListItemProps } from '../../molecules/CardListItem';

import TrendBadgeNegative from './TrendBadgeNegative';
import TrendBadgePositive from './TrendBadgePositive';

interface ITrendsCardListItemProps extends ICardListItemProps {
	trendCount?: string,
	uptrend?: boolean
}

const TrendsCardListItem: React.FC<ITrendsCardListItemProps> = ({uptrend, 
	trendCount, ...rest}) => (
	<Fragment>
		<CardListItem {...rest}>
			{uptrend 
				? <TrendBadgePositive count={trendCount}/>
				: <TrendBadgeNegative count={trendCount}/>
			}
		</CardListItem>
	</Fragment>
);

TrendsCardListItem.defaultProps = {
	trendCount: '0',
	uptrend: true
};

export default TrendsCardListItem;