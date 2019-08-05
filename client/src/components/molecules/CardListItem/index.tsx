import React from 'react';

import Container from './Container';
import Titles from './Titles';

export interface ICardListItemProps {
	subtitleText?: string,
	borderLeftColor?: string,
	titleText: string
}

const CardListItem: React.FC<ICardListItemProps> = (props) => (
	<Container {...props}>
		<Titles {...props} />
		{props.children}
	</Container>
);

CardListItem.defaultProps = {
	borderLeftColor: '#fff'
};

export default CardListItem;