import styled from 'styled-components';

import { vrEmFunc } from '../../design-system/abstracts';

const Container = styled.div`
	position: fixed;
	top: ${vrEmFunc(1)};
	right: ${vrEmFunc(1)};
	z-index: 2;
`;

export default Container;