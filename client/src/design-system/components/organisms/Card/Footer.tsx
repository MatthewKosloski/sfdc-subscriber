import styled from 'styled-components';

import { spacingEm } from '../../../abstracts/mixins';
import { pxToEm } from '../../../abstracts/functions';

const Footer = styled.div`
	${spacingEm(['PT', 'PB', 'PL', 'PR'], 'One')}
	border-top: ${pxToEm(1)} solid ${({theme: {colors}}) => colors.gallery};
`;

export default Footer;