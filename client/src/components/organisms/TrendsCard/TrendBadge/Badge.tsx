import styled from 'styled-components';

import { Badge } from '../../../../design-system/components';
import { pxToEm, spacingEm } from '../../../../design-system/abstracts';

const Container = styled(Badge)`
	svg {
		${spacingEm(['MR'], 'Quarter')}
		width: ${pxToEm(12)};
	}
`;

export default Container;