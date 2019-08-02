import React from 'react';

import { ICardProps } from '../../';

import Container from './Container';
import Title from './Title';
import Subtitle from './Subtitle';

const Titles: React.FC<ICardProps> = (props) => {
	return(
		<Container {...props}>
			<Title>{props.titleText}</Title>
			{props.subtitleText &&
				<Subtitle>{props.subtitleText}</Subtitle>
			}
		</Container>
	);
};

export default Titles;