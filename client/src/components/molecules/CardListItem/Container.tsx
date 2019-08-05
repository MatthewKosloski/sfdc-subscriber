import styled from 'styled-components';

import { pxToEm, spacingEm } from '../../../design-system/abstracts';

import { ICardListItemProps } from './';

const Container = styled.article<ICardListItemProps>`
	${spacingEm(['PT', 'PB', 'PL', 'PR'], 'One')}

	&:not(:last-of-type) {
		box-shadow: 0 ${pxToEm(1)} ${({theme}) => theme.gallery};
	}
	svg {
		width: ${pxToEm(12)};
	}
	border-left: ${pxToEm(5)} solid ${(props) => props.borderLeftColor};
	display: flex;
    align-items: center;
	justify-content: space-between;
	margin-bottom: 0;
`;

export default Container;