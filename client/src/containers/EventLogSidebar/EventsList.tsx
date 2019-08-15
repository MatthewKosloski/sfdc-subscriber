import styled from 'styled-components';

import { pxToEm } from '../../design-system/abstracts';

const EventsList = styled.div`
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    position: relative;
    &::before {
        content: '';
        width: ${pxToEm(2)};
        height: 100%;
        background-color: ${({theme}) => theme.gallery};
        display: block;
        position: absolute;
        left: 8px;
    }
`;

export default EventsList;