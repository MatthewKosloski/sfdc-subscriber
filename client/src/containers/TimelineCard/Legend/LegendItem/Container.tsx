import styled from 'styled-components';

interface Props {
	circleColor: string
}

const Container = styled.li<Props>`
	color: ${(props) => props.circleColor};
`;

export default Container;