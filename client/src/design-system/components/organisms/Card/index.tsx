import React from 'react';

import Container from './Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

interface IProps {
	title: string,
	subtitle?: string,
	sideHeaderComponent?: React.ReactElement,
	footerComponent?: React.ReactElement
};

const Card: React.FC<IProps> = (props) => {
	return(
		<Container>
			<Header {...props} />
			<Body>
				{props.children}
			</Body>
			{props.footerComponent &&
				<Footer>
					{props.footerComponent}
				</Footer>
			}
		</Container>
	);
};

export default Card;