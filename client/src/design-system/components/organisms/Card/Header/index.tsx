import React from 'react';

import Container from './Container';
import Titles from './Titles';

import { ICardProps } from '../';

const Header: React.FC<ICardProps> = (props) => {
	return(
		<Container>
			<Titles {...props} />
			{props.sideHeaderComponent}
		</Container>
	);
};

export default Header;