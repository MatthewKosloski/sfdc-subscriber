import React from 'react';
import { ButtonVariantStrings } from '../../../theme/buttons';

import Container from './Container';
import IconContainer from './IconContainer';
import Content from './Content';
import InfoIcon from './InfoIcon';
import StopIcon from './StopIcon';
import CheckIcon from './CheckIcon';

export interface Props {
	message: string,
	variant?: ButtonVariantStrings,
	onClick: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Toast: React.FC<Props> = ({onClick, ...props}) => {

	let icon = <InfoIcon />;
	if(props.variant === 'success' || props.variant === 'successLight') {
		icon = <CheckIcon />;
	} else if(props.variant === 'danger' || props.variant === 'dangerLight') {
		icon = <StopIcon />;
	}

	return (
		<Container
			tabIndex={0}
			onClick={onClick}
			onKeyDown={onClick}
			{...props}>
			<IconContainer>
				{icon}
			</IconContainer>
			<Content>{props.message}</Content>
		</Container>
	);
};

Toast.defaultProps = {
	variant: 'primary'
};

export default Toast;