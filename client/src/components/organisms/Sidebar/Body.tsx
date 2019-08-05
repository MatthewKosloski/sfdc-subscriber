import styled from 'styled-components';

// import { spacingEm } from '../../../design-system/abstracts';

const Body = styled.div`
    &::-webkit-scrollbar {
        width: 0px;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow: auto;
    overflow-x: hidden;
`;

export default Body;