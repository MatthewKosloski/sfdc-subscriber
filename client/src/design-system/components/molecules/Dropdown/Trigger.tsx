import styled from 'styled-components';

import { spacingEm, dropdownButtonVariant } from '../../../abstracts/mixins';

import Button from '../../atoms/Button';

const Trigger = styled(Button)`
    &[aria-expanded=true] {
        svg {
            transform: rotate(180deg);
        }
    }
    svg {
        ${spacingEm(['ML'], 'One')};
        transition-property: transform, fill;
        transition-duration: 0.15s;
        transition-timing-function: ease-in-out;
        width: 1em;
        height: 1em;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${(props) => dropdownButtonVariant(props)};
`;

export default Trigger;