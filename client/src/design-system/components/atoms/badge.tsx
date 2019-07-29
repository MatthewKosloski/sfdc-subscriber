import styled from 'styled-components';
import { spacingEm, buttonVariant } from '../../abstracts/mixins';
import { pxToEm, pxToRem } from '../../abstracts/functions';
import { white } from '../../theme/colors';
import { IButtonProps, defaultProps } from '../../theme/buttons'; 
import withDefaultProps from '../../hoc/withDefaultProps';

const StyledBadge = styled.div<IButtonProps>`
    ${spacingEm(['PT', 'PB'], 'Half')}
    ${spacingEm(['PL', 'PR'], 'One')}
    border: ${pxToEm(1)} solid transparent;
    border-radius: ${pxToEm(32)};     
    color: ${white};
    display: inline-block;

    ${(props) => props.heavy && `
        font-weight: 700;
    `}

    ${(props) => props.small && `
        font-size: ${pxToRem(12)};
    `}

    ${(props) => props.large && `
        font-size: ${pxToRem(20)};
    `}

    ${(props) => buttonVariant(props)};

`;

const Badge = withDefaultProps(StyledBadge, defaultProps);

export default Badge;