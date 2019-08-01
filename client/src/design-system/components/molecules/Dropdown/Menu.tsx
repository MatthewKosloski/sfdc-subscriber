import styled from 'styled-components';

import { pxToEm } from '../../../abstracts/functions';
import { spacingEm } from '../../../abstracts/mixins';

interface IProps {
    isOpen: boolean
}

const Menu = styled.ul<IProps>`
    ${spacingEm(['MT'], 'Half')};
    display: ${(props) => props.isOpen ? 'block' : 'none'};
    box-shadow: 0 ${pxToEm(3)} ${pxToEm(5)} 0 rgba(0, 0, 0, 0.05);
    border-radius: ${pxToEm(4)};
    background-color: ${({theme: {colors}}) => colors.white};
    border: ${pxToEm(1)} solid ${({theme: {colors}}) => colors.gallery};
    position: absolute;
    padding-left: 0;
    margin-bottom: 0;
    min-width: 200px;
    top: calc(100%);
    left: 0;
    z-index: 1;
`;

export default Menu;