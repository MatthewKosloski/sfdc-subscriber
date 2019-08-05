import styled from 'styled-components';

import { Button } from '../../../../design-system/components'; 
import { spacingEm } from '../../../../design-system/abstracts';

const ClearButton = styled(Button).attrs({
    variant: 'danger',
    small: true
})`
    ${spacingEm(['ML'], 'One')};
`;

export default ClearButton;