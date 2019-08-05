import styled from 'styled-components';

import { spacingEm } from '../../../design-system/abstracts';

const Header = styled.header`
    ${spacingEm(['PB', 'PR'], 'One')};
    display: flex;
    align-items: center;
`;

export default Header;