import React from 'react';

import { ICardProps } from '../';

import Container from './Container';
import Titles  from './Titles';

const Header: React.FC<ICardProps> = (props) => {
	return(
		<Container>
			<Titles {...props} />
			{props.sideHeaderComponent}
		</Container>
	);
};

export default Header;