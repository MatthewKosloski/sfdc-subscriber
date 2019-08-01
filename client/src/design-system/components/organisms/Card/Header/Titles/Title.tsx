import styled from 'styled-components';

const Title = styled.h2.attrs({
	className: 'h3 u-mb-zero'
})`
	color: ${({theme}) => theme.neutralBlack};
	font-weight: 700;
`;

export default Title;