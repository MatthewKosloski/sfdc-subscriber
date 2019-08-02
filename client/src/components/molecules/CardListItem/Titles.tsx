import styled from 'styled-components';

import { Titles as DesignSystemTitles }  from '../../../design-system/components';
import { ITitlesProps as IDesignSystemTitlesProps } from '../../../design-system/components/molecules/Titles';

const Titles = styled(DesignSystemTitles)
.attrs({
	titleAs: 'h3'
})<IDesignSystemTitlesProps>`
	margin-right: auto;
	max-width: 60%;
	word-wrap: break-word;
`;

export default Titles;