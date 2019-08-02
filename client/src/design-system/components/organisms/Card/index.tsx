import React from 'react';

import Container from './Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export interface ICardProps {
	titleText: string,
	className?: string,
	subtitleText?: string,
	sideHeaderComponent?: React.ReactElement,
	footerComponent?: React.ReactElement,
	noPaddedBody?: boolean,
	fullBodyHeight?: boolean,
	constrictBodyHeight?: boolean,
	headerHasSpaceBetween?: boolean
};

const Card: React.FC<ICardProps> = (props) => {

	const { className, ...rest } = props;

	return(
		<Container className={className}>
			<Header {...rest} />
			<Body {...rest}>
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