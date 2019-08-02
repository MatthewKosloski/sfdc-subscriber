import styled from 'styled-components';

import { spacingEm, pxToEm, breakpoint } from '../../../design-system/abstracts';

const Container = styled.aside`
	${spacingEm(['PT'], 'Two')}
	${spacingEm(['PL'], 'One')}
	${breakpoint('XL')} {
		flex: 1;
	}
	display: flex;
	flex-direction: column;
	flex: 1 0 100%;
	background-color: ${({theme}) => theme.white};
	border-left: ${pxToEm(1)} solid ${({theme}) => theme.gallery};
	height: 100vh;
	position: sticky;
	top: 0;
`;

export default Container;