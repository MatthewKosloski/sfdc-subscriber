import styled from 'styled-components';

import { spacingEm, pxToEm } from '../../../design-system/abstracts';

const Container = styled.header`
	${spacingEm(['P'], 'One')};
	background-color: ${({theme}) => theme.white};
	border-bottom: ${pxToEm(1)} solid ${({theme}) => theme.gallery};
	display: flex;
	align-items: center;
`;

export default Container;