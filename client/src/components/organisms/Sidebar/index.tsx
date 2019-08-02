import React from 'react';

import Container from './Container';

interface ISidebarProps {}

const Sidebar: React.FC<ISidebarProps> = (props) => (
	<Container>
		{props.children}
	</Container>
);

export default Sidebar;