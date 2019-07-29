import React from 'react';

import { IHeaderProps } from '../';

import Container from './Container';
import Title from './Title';
import Subtitle from './Subtitle';

const Titles: React.FC<IHeaderProps> = (props) => {
	return(
		<Container {...props}>
			<Title>{props.title}</Title>
			{props.subtitle &&
				<Subtitle>{props.subtitle}</Subtitle>
			}
		</Container>
	);
};

export default Titles;