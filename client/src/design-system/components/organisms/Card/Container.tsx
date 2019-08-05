import styled from 'styled-components';

import { pxToEm } from '../../../abstracts';

const Container = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: ${pxToEm(6)};
	border: ${pxToEm(1)} solid ${({theme}) => theme.gallery};
	box-shadow: 0 ${pxToEm(3)} ${pxToEm(4)} 0 rgba(0, 0, 0, 0.04);
	background-color: ${({theme}) => theme.white};
`;

export default Container;