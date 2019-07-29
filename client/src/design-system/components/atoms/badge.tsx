import styled from 'styled-components';
import { pxToEm } from '../../abstracts/functions';
import { defaultProps } from '../../theme/buttons';
import withDefaultProps from '../../hoc/withDefaultProps';

import StyledButton from './Button';

const StyledBadge = styled(StyledButton)`
	border-radius: ${pxToEm(32)};
	pointer-events: none;
	cursor: auto;
`;

const Badge = withDefaultProps(StyledBadge, defaultProps);

export default Badge;