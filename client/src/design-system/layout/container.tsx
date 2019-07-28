import styled from 'styled-components';
import { spacingRem } from '../abstracts/mixins';

interface IContainerProps {};

const container = styled.div<IContainerProps>`
    ${spacingRem(['PL', 'PR'], 'One')};
    width: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
`;

export default container;