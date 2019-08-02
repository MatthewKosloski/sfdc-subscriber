import styled from 'styled-components';

import { Titles as TitlesMolecule }  from '../../../molecules';

interface ITitlesProps {
	headerHasSpaceBetween?: boolean
}

const Titles = styled(TitlesMolecule)<ITitlesProps>`
	margin-right: ${(props) => props.headerHasSpaceBetween ? 'auto' : '0'};
`;

export default Titles;