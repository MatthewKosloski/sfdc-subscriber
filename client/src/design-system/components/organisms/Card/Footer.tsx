import styled from 'styled-components';

import { spacingEm, pxToEm } from '../../../abstracts';

const Footer = styled.div`
	${spacingEm(['PT', 'PB', 'PL', 'PR'], 'One')}
	border-top: ${pxToEm(1)} solid ${({theme: {colors}}) => colors.gallery};
`;

export default Footer;