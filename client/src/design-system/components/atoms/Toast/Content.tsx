import styled from 'styled-components';

import { spacingEm } from '../../../abstracts';

const Content = styled.span`
	${spacingEm(['PL', 'PR'], 'One')}
	${spacingEm(['PT', 'PB'], 'ThreeFourths')}
	word-break: break-all;
`;

export default Content;