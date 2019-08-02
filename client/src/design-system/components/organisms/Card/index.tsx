import React from 'react';

import Container from './Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export interface ICardProps {
	titleText: string,
	subtitleText?: string,
	sideHeaderComponent?: React.ReactElement,
	footerComponent?: React.ReactElement,
	noPaddedBody?: boolean,
	fullBodyHeight?: boolean,
	constrictBodyHeight?: boolean
};

const Card: React.FC<ICardProps> = (props) => {
	return(
		<Container>
			<Header {...props} />
			<Body {...props}>
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