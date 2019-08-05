import styled from 'styled-components';

import { pxToEm } from '../../abstracts';
import { defaultButtonProps } from '../../theme';
import { withDefaultProps } from '../../hoc/';

import { StyledButton } from './Button';

const StyledBadge = styled(StyledButton).attrs({
	as: 'div'
})`
	border-radius: ${pxToEm(32)};
	pointer-events: none;
	display: inline-block;
	cursor: auto;
`;

const Badge = withDefaultProps(StyledBadge, {...defaultButtonProps});

export default Badge;