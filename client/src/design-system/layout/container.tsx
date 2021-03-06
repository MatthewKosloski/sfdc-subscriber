import styled from 'styled-components';

import { containerWidth } from '../theme';
import { spacingRem } from '../abstracts';

interface IContainerProps {};

const container = styled.div<IContainerProps>`
    ${spacingRem(['PL', 'PR'], 'One')};
    width: ${containerWidth};
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
`;

export default container;