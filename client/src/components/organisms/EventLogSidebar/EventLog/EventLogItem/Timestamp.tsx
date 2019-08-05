import styled from 'styled-components';

import { spacingEm } from '../../../../../design-system/abstracts';

const Timestamp = styled.p`
    ${spacingEm(['MB'], 'Half')};
    font-weight: 700;
    color: ${({theme}) => theme.pantoneCoolGray4};
    &::before {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: ${({theme}) => theme.white};
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        border: 4px solid;
        border-color: inherit;
        box-shadow: 0 0 0 6px ${({theme}) => theme.white};
    }
`;

export default Timestamp;