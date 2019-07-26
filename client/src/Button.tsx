import styled, { css } from 'styled-components';
import { breakpoint } from './design-system/abstracts/mixins';

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
		color: orange;
	}

`;

export default Button;