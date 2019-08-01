import styled from 'styled-components';

import { breakpoint, spacingEm } from '../../design-system/abstracts/mixins';

const Main = styled.main`
	${spacingEm(['P'], 'One')}

	${breakpoint('XL')} {
		flex: 1.5;
	}
	flex: 1 0 100%;
`;

export default Main;