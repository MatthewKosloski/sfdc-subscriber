import styled from 'styled-components';

import { ICardProps } from '../../';

const Container = styled.div<ICardProps>`
	${(props) => (props.sideHeaderComponent != null && props.headerHasSpaceBetween) && `
		margin-right: auto;
	`}
`;

export default Container;