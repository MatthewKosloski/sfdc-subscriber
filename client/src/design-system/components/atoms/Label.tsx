import styled from 'styled-components';

import { spacingEm } from '../../abstracts/mixins';

const Label = styled.label`
	${spacingEm(['MB'], 'Half')};
    display: block;
`;

export default Label;