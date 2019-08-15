import styled from 'styled-components';

import { Column } from '../../design-system/layout';
import { spacingEm, breakpoint } from '../../design-system/abstracts';

const TimelineCardColumn = styled(Column).attrs({
	sizes: [['SM', 12], ['MD', 6]]
})`
	${spacingEm(['PT', 'PB'], 'One')}
	${breakpoint('MD')} {
		height: 100%;
	}
	:first-of-type {
		border-right: 1px solid ${({theme}) => theme.gallery};
	}
`;

export default TimelineCardColumn;