import styled from 'styled-components';

import { spacingEm, vrEm } from '../../../design-system/abstracts';

const Container = styled.article`
    &:first-of-type {
        ${spacingEm(['MT'], 'Two')};
    }
    &:last-of-type {
        margin-bottom: 0;
    }
    &::after {
        content: '';
        display: block;
        ${vrEm(['height'], 2)};
    }
    ${spacingEm(['PL'], 'Two')};
    ${spacingEm(['PR'], 'One')};
    position: relative;
`;

export default Container;