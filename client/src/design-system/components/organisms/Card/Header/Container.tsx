import styled from 'styled-components';

import { pxToEm } from '../../../../abstracts/functions';
import { spacingEm } from '../../../../abstracts/mixins';

const Container = styled.div`
	${spacingEm(['PL', 'PR'], 'One')}
	${spacingEm(['PT', 'PB'], 'Half')}
	border-bottom: ${pxToEm(1)} solid ${({theme: {colors}}) => colors.gallery};
    display: flex;
    align-items: center;
`;

export default Container;