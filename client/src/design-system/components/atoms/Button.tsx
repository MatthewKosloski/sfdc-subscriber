import styled from 'styled-components';
import { spacingEm, buttonVariant } from '../../abstracts/mixins';
import { pxToEm, pxToRem } from '../../abstracts/functions';
import { IButtonProps, defaultProps } from '../../theme/buttons';
import withDefaultProps from '../../hoc/withDefaultProps';

export const StyledButton = styled.button<IButtonProps>`
    ${spacingEm(['PT', 'PB'], 'Half')}
	${spacingEm(['PL', 'PR'], 'One')}
	font-size: 1em;
	border-radius: ${pxToEm(4)};
    border: ${pxToEm(1)} solid transparent;
    cursor: pointer;
    transition-property: box-shadow, background-color, color, border-color;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    color: ${({theme: colors}) => colors.white};
	user-select: none;

	&:disabled {
        opacity: 0.5;
        cursor: not-allowed;
	}

    &:focus {
        outline: 0;
    }

    ${(props) => props.heavy && `
        font-weight: 700;
    `}

    ${(props) => props.small && `
        font-size: ${pxToRem(12)};
    `}

    ${(props) => props.large && `
        font-size: ${pxToRem(20)};
    `}

    ${(props) => buttonVariant(props)};

`;

const Button = withDefaultProps(StyledButton, defaultProps);

export default Button;