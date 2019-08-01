import styled from 'styled-components';

const Subtitle = styled.p`
	margin-bottom: 0;
	color: ${({theme: {colors}}) => colors.pantoneCoolGray4};
	font-size: 1rem;
`;

export default Subtitle;