import React, { Fragment } from 'react';

import { Titles } from '../../../design-system/components';

import Counter from './Counter';
// import Form from './Form';
import ClearButton from './ClearButton';

interface Props {
	count: number,
	onButtonClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	isButtonDisabled?: boolean
}

const Header: React.FC<Props> = ({count, onButtonClick, isButtonDisabled}) => (
    <Fragment>
        <Titles titleText="Event Log" />
        <Counter count={count} />
        {/* <Form /> */}
		<ClearButton
			disabled={isButtonDisabled}
			onClick={onButtonClick}>
			Clear All
		</ClearButton>
    </Fragment>
);

Header.defaultProps = {
	onButtonClick: () => {},
	isButtonDisabled: false
};

export default Header;