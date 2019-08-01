import React from 'react';

import Container from './Container';
import Titles from './Titles';
import Title from './Title';

interface IProps {
	title: string
};

const Header: React.FC<IProps> = (props) => (
	<Container>
		<Titles>
			<Title>{props.title}</Title>
		</Titles>
	</Container>
);

export default Header;