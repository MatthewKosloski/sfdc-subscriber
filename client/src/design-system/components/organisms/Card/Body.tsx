import styled from 'styled-components';

import { spacingEm } from '../../../abstracts';

const Body = styled.div`
	${spacingEm(['PL', 'PR', 'PT', 'PB'], 'One')}
	overflow-y: auto;
	height: 100%;
`;

export default Body;