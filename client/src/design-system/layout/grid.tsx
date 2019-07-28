import styled from 'styled-components';
import { ColumnSizes } from '../theme/layout';
import { spacingRem, negativeSpacingRem, flexColumns } from '../abstracts/mixins';

interface IRowProps {};

export const Row = styled.div<IRowProps>`
    ${negativeSpacingRem(['ML', 'MR'], 'One', 'One', true)};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

interface IColumnProps {
    sizes: ColumnSizes,
};

export const Column = styled.div<IColumnProps>`
    ${spacingRem(['PL', 'PR'], 'One')};
    ${({sizes}) => flexColumns(sizes)};
`;