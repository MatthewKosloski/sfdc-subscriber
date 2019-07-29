import styled from 'styled-components';

import { IHeaderProps } from '../';

const Container = styled.div<IHeaderProps>`
	${(props) => (props.sideHeaderComponent != null) && `
		margin-right: auto;
	`}
`;

export default Container;