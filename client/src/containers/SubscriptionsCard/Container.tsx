import styled from 'styled-components';

import { vrRemFunc, breakpoint } from '../../design-system/abstracts';

const Container = styled.div.attrs({
	className: 'u-pt-one'
})`
	${breakpoint('MD')} {
		margin-right: -${vrRemFunc(1)};
	}

	height: 100%;
	margin-right: 0;
`;

export default Container;