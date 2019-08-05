import styled from 'styled-components';

import { spacingEm } from '../../abstracts';

interface ILabelProps {
    inline?: boolean,
    block?: boolean
}

const Label = styled.label<ILabelProps>`
    ${(props) => props.block && `
        ${spacingEm(['MB'], 'Half')};
        display: block;
    `}
    ${(props) => props.inline && `
        ${spacingEm(['MR'], 'Half')};
        display: inline-block;
    `}
`;

Label.defaultProps = {
    inline: false,
    block: true
};

export default Label;