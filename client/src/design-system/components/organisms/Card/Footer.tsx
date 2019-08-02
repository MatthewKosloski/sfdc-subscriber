import styled from 'styled-components';

import { spacingEm, pxToEm } from '../../../abstracts';

const Footer = styled.div`
	${spacingEm(['PT', 'PB', 'PL', 'PR'], 'One')}
	border-top: ${pxToEm(1)} solid ${({theme}) => theme.gallery};
`;

export default Footer;