import styled from 'styled-components';

import { spacingEm, pxToEm } from '../../../abstracts';

const IconContainer = styled.span`
	${spacingEm(['PL', 'PR'], 'One')}
	${spacingEm(['PT', 'PB'], 'ThreeFourths')}
	color: ${({theme}) => theme.white};
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #df4747;
	border-top-left-radius: inherit;
	border-bottom-left-radius: inherit;
	svg {
		width: ${pxToEm(14)};
	}
`;

export default IconContainer;