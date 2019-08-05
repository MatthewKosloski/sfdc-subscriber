import styled from 'styled-components';

interface ITitleProps {
	titleAs?: string
}

const Title = styled.h2.attrs((props: ITitleProps) => ({
	className: 'u-mb-zero',
	as: props.titleAs
}))<ITitleProps>`
	color: ${({theme}) => theme.neutralBlack};
	font-weight: 700;
`;

export default Title;