import styled from 'styled-components';

interface IProps {
    href: string
}

const DropdownItem = styled.li<IProps>`
    color: red;
`;

export default DropdownItem;