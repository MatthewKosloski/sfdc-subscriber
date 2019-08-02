import React from 'react';

import Title from './Title';
import Subtitle from './Subtitle';

export interface ITitlesProps {
	subtitleText?: string,
	className?: string,
	titleAs?: string,
	subtitleAs?: string,
	titleText: string,
}

const Titles: React.FC<ITitlesProps> = ({className, titleText,
	subtitleText, titleAs, subtitleAs}) => {
	return(
		<div className={className}>
			<Title
				titleAs={titleAs}>
				{titleText}
			</Title>
			{subtitleText &&
				<Subtitle
					subtitleAs={subtitleAs}>
					{subtitleText}
				</Subtitle>
			}
		</div>
	);
};

Titles.defaultProps = {
	titleAs: 'h2'
};

export default Titles;