import styled from 'styled-components';

import { spacingEm } from '../../../abstracts';

const Content = styled.span`
	${spacingEm(['PL', 'PR'], 'One')}
	${spacingEm(['PT', 'PB'], 'ThreeFourths')}
`;

export default Content;