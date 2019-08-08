import styled from 'styled-components';

import { pxToEm, spacingEm } from '../../../../design-system/abstracts';

import { toastVariant } from '../../../abstracts';
import { Props } from './';

const Container = styled.div<Props>`
	${spacingEm(['MB'], 'One')};
	border-radius: ${pxToEm(4)};
	z-index: 1;
	opacity: 0.95;
	user-select: none;
	max-width: 450px;
	display: flex;
	background-color: ${({theme}) => theme.white};
	box-shadow: inset 0 0 0 ${pxToEm(1)} ${({theme}) => theme.gallery},
	0 ${pxToEm(1)} ${pxToEm(5)} rgba(0, 0, 0, 0.04);

	span:first-of-type {
		${(props) => toastVariant(props)}
	}
`;

export default Container;