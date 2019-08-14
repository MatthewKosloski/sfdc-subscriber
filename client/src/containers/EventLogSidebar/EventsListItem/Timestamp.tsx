import styled from 'styled-components';

import { spacingEm } from '../../../design-system/abstracts';

type Props = {
	circleColor?: string | null
}

const Timestamp = styled.time<Props>`
	${spacingEm(['MB'], 'Half')};
	display: inline-block;
    font-weight: 700;
	color: ${({theme}) => theme.pantoneCoolGray4};
	border-color: ${(props) => props.circleColor};
    &::before {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: ${({theme}) => theme.white};
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        border: 4px solid;
        border-color: inherit;
        box-shadow: 0 0 0 6px ${({theme}) => theme.white};
    }
`;

Timestamp.defaultProps = {
	circleColor: '#000'
};

export default Timestamp;