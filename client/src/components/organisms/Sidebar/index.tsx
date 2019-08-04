import React from 'react';

import Container from './Container';
import Header from './Header';
import Body from './Body';

interface ISidebarProps {
	headerComponent?: React.ReactElement
}

const Sidebar: React.FC<ISidebarProps> = ({headerComponent, children}) => (
	<Container>
		<Header>
			{headerComponent}
		</Header>
		<Body>
			{children}
		</Body>
	</Container>
);

export default Sidebar;