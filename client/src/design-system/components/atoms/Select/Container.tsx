import styled from 'styled-components';

import { StyledButton } from '../../../../design-system/components/atoms/Button';


const Container = styled(StyledButton).attrs({
    as: 'select',
    variant: 'primary',
    outline: true,
    small: true
})`
`;

export default Container;