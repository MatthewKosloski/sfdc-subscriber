import React from 'react';

import { Badge } from '../../../design-system/components';

interface ICounterProps {
    count?: number
}

const Counter: React.FC<ICounterProps> = ({count}) => (
    <Badge
        className="u-ml-half u-mr-auto"
        variant="normal"
        outline
        heavy
        small>
        {count}
    </Badge>
);

Counter.defaultProps = {
    count: 0
};

export default Counter;