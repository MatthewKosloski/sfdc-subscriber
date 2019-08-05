import React, { Fragment } from 'react';

import { Titles } from '../../../../design-system/components';

import Counter from './Counter';
import Form from './Form';
import ClearButton from './ClearButton';

const Header: React.FC<{}> = () => (
    <Fragment>
        <Titles titleText="Event Log" />
        <Counter count="45" />
        <Form />
        <ClearButton>Clear All</ClearButton>
    </Fragment>
);

export default Header;