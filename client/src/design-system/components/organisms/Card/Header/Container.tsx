import styled from 'styled-components';

import { spacingEm, pxToEm } from '../../../../abstracts';

const Container = styled.header`
	${spacingEm(['PL', 'PR'], 'One')}
	${spacingEm(['PT', 'PB'], 'Half')}
	border-bottom: ${pxToEm(1)} solid ${({theme}) => theme.gallery};
    display: flex;
    align-items: center;
`;

export default Container;