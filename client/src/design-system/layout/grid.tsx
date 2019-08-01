import styled from 'styled-components';

import { ColumnSizes } from '../theme/layout';
import { spacingRem, negativeSpacingRem, flexColumns } from '../abstracts';
import { withDefaultProps } from '../hoc';

interface IRowProps {};

export const Row = styled.div<IRowProps>`
    ${negativeSpacingRem(['ML', 'MR'], 'One', 'One', true)};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

interface IColumnProps {
	sizes: ColumnSizes,
	className?: string
};

const columnDefaultProps = {
	sizes: [['XS', 12]],
	className: ''
};

export const StyledColumn = styled.div<IColumnProps>`
    ${spacingRem(['PL', 'PR'], 'One')};
    ${({sizes}) => flexColumns(sizes)};
`;

export const Column = withDefaultProps(StyledColumn,
    columnDefaultProps);