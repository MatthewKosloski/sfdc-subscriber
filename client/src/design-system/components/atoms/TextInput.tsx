import styled from 'styled-components';

import { spacingEm, pxToEm } from '../../abstracts';

const TextInput = styled.input.attrs({
	type: 'text'
})`
	${spacingEm(['PT', 'PB'], 'Half')}
	${spacingEm(['PL', 'PR'], 'One')}
	width: 100%;
	display: block;
	font-size: 1em;
	border-radius: ${pxToEm(4)};
	border: ${pxToEm(1)} solid ${({theme}) => theme.gallery};
	color: ${({theme}) => theme.neutralBlack};
	background-color: transparent;
	transition-property: box-shadow;
	transition-duration: 0.15s;
	transition-timing-function: ease-in-out;
	&:focus {
		box-shadow: 0 0 0 ${pxToEm(3)} ${({theme}) => theme.silver};
		outline: 0;
	}
`;

export default TextInput;