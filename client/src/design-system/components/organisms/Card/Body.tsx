import styled from 'styled-components';

import { spacingEm } from '../../../abstracts';

import { ICardProps } from './';

const Body = styled.div<ICardProps>`
	${({noPaddedBody}) => noPaddedBody ? '' : spacingEm(['PL', 'PR', 'PT', 'PB'], 'One')}
	overflow-y: auto;
	height: 100%;
	min-height: 100px;
	max-height: ${({fullBodyHeight, constrictBodyHeight}) => {
		if(fullBodyHeight) {
			return `100%`;
		} else if(constrictBodyHeight) {
			return '375px';
		}
	}}
`;

export default Body;