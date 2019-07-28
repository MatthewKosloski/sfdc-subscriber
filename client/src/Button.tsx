import styled, { css } from 'styled-components';
import { breakpoint, fluidType, spacingRem } from './design-system/abstracts/mixins';

interface IButtonProps {
	primary?: Boolean
};

const color = 'red';

const Button = styled.button<IButtonProps>`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0 1em;
	padding: 0.25em 1em;

	${(props) => props.primary && css`
		background: palevioletred;
		color: black;
	`};

	${breakpoint('LG')} {
		color: ${(props) => props.primary ? color : 'green'};
		font-weight: 700;
	}

	${fluidType(4, 4)}
	${spacingRem(['PT', 'PB'], 'One')}

`;

export default Button;