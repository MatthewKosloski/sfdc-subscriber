import styled from 'styled-components';

import { pxToEm } from '../../../abstracts/functions';

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: ${pxToEm(6)};
	border: ${pxToEm(1)} solid ${({theme: {colors}}) => colors.gallery};
	box-shadow: 0 ${pxToEm(3)} ${pxToEm(4)} 0 rgba(0, 0, 0, 0.04);
	background-color: ${({theme: {colors}}) => colors.white};
`;

export default Container;