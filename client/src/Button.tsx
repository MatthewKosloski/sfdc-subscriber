import styled, { css } from 'styled-components';
import { breakpoint, fluidType } from './design-system/abstracts/mixins';

interface IButtonProps {
	primary?: Boolean
};

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

	${breakpoint('lg')} {
		color: pink;
	}

	${fluidType(4, 4, 1.2, 1.3, '31.250rem', '62.5rem')}

`;

export default Button;