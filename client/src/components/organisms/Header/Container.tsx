import styled from 'styled-components';

import { spacingEm } from '../../../design-system/abstracts/mixins';
import { pxToEm } from '../../../design-system/abstracts/functions';

const Container = styled.header`
	${spacingEm(['P'], 'One')};
	background-color: ${({theme: {colors}}) => colors.white};
	border-bottom: ${pxToEm(1)} solid ${({theme: {colors}}) => colors.gallery};
	display: flex;
	align-items: center;
`;

export default Container;