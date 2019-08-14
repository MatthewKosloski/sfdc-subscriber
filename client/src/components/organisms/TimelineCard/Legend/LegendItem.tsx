import styled from 'styled-components';

import { vrEmFunc, pxToEm } from '../../../../design-system/abstracts';

interface Props {
	circleColor?: string
}

const circleSize: number = 14;

const LegendItem = styled.li<Props>`
	padding-left: calc(${pxToEm(circleSize)} + ${vrEmFunc(1)});
	list-style: none;
	position: relative;
	&::before {
		content: '';
		width: ${pxToEm(circleSize)};
		height: ${pxToEm(circleSize)};
		display: block;
		background-color: ${(props) => props.circleColor};
		border-radius: 100%;
		position: absolute;
		left: 0;
		top: ${pxToEm(3)};
	}
`;

LegendItem.defaultProps = {
	circleColor: '#000'
};

export default LegendItem;