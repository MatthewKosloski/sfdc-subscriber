import styled from 'styled-components';

import { spacingEm } from '../../../../design-system/abstracts';

const Legend = styled.ul`
	${spacingEm(['P'], 'One')}
	margin-bottom: 0;
	border-right: 1px solid #eaeaea;
	height: 100%;
`;

export default Legend;