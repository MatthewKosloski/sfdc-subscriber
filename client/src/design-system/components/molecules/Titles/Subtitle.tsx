import styled from 'styled-components';

interface ISubtitleProps {
	subtitleAs?: string
}

const Subtitle = styled.p.attrs((props: ISubtitleProps) => ({
	as: props.subtitleAs
}))<ISubtitleProps>`
	margin-bottom: 0;
	color: ${({theme}) => theme.pantoneCoolGray4};
	font-size: 1rem;
`;

export default Subtitle;