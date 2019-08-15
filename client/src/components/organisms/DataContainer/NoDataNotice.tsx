import styled from 'styled-components';

import { pxToEm } from '../../../design-system/abstracts';

const NoDataNotice = styled.p.attrs({
	className: 'u-align-center'
})`
	color: ${({theme}) => theme.pantoneCoolGray1};
	font-size: ${pxToEm(14)};
	height: 100%;
	margin-bottom: 0;
`;

export default NoDataNotice;