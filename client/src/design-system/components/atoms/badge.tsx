import styled from 'styled-components';
import { pxToEm } from '../../abstracts/functions';
import { defaultProps } from '../../theme/buttons';
import withDefaultProps from '../../hoc/withDefaultProps';

import { StyledButton } from './Button';

const StyledBadge = styled(StyledButton).attrs({
	as: 'div'
})`
	border-radius: ${pxToEm(32)};
	pointer-events: none;
	display: inline-block;
	cursor: auto;
`;

const Badge = withDefaultProps(StyledBadge, {...defaultProps});

export default Badge;