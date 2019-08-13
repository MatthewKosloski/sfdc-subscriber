import React, { FunctionComponent } from 'react';

import { Button } from '../../../design-system/components';

interface Props {
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const RemoveButton: FunctionComponent<Props> = ({onClick}) => (
	<Button
		fullWidth
		small
		outline
		onClick={onClick}>
		Remove
	</Button>
);

export default RemoveButton;