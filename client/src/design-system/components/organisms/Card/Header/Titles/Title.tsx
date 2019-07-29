import styled from 'styled-components';

const Title = styled.h2.attrs({
	className: 'h3'
})`
	margin-bottom: 0;
	color: ${({theme: {colors}}) => colors.neutralBlack};
	font-weight: 700;
`;

export default Title;