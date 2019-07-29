import React from 'react';

import Container from './Container';
import Titles from './Titles';

export interface IHeaderProps {
	title: string,
	subtitle?: string,
	sideHeaderComponent?: React.ReactElement
};

const Header: React.FC<IHeaderProps> = (props) => {
	return(
		<Container>
			<Titles {...props} />
			{props.sideHeaderComponent}
		</Container>
	);
};

export default Header;