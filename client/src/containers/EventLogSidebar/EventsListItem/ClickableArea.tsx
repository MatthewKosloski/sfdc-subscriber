import styled from 'styled-components';

import { spacingEm, negativeSpacingEm, pxToEm } from '../../../design-system/abstracts';

interface Props {
	isOpen: boolean
}

const ClickableArea = styled.div<Props>`
	&:hover,
	&:focus {
		background-color: ${({theme}) => theme.gallery};
	}
	background-color: ${({isOpen, theme}) => isOpen ? theme.gallery : 'transparent'};
	${spacingEm(['PT'], 'Quarter')}
	${spacingEm(['PB'], 'Half')}
	${spacingEm(['PL', 'PR'], 'Half')}
	${negativeSpacingEm(['ML'], 'One')}
	transition: background-color 0.15s ease-in-out;
	border-radius: ${pxToEm(6)};
	cursor: pointer;
	outline: none;
`;

export default ClickableArea;