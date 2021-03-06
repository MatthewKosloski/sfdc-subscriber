import React, { Fragment } from 'react';

import { CardListItem } from '../../molecules';
import { ICardListItemProps } from '../../molecules/CardListItem';

import TrendBadgeNegative from './TrendBadgeNegative';
import TrendBadgePositive from './TrendBadgePositive';

interface ITrendsListItem extends ICardListItemProps {
	trendCount?: string,
	uptrend?: boolean
}

const TrendsListItem: React.FC<ITrendsListItem> = ({uptrend,
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

TrendsListItem.defaultProps = {
	trendCount: '0',
	uptrend: true
};

export default TrendsListItem;