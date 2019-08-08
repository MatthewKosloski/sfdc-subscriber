import colors from './colors';

export type ButtonVariantStrings = 'normal' | 'primary' | 'danger' |
'dangerLight' | 'success' | 'successLight';

export interface IButtonProps {
	className?: string,
	variant?: ButtonVariantStrings,
	transparent?: boolean,
	selected?: boolean,
    outline?: boolean,
    heavy?: boolean,
    small?: boolean,
	large?: boolean,
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
	type?: string,
	disabled?: boolean
};

export const defaultButtonProps: IButtonProps = {
	variant: 'normal',
	type: 'button'
};

export const normal = {
	backgroundColor: colors.neutralBlack,
	backgroundColorHover: colors.shark,
	borderColorFocus: colors.jumbo,
	color: colors.white
};

export const primary = {
	backgroundColor: colors.pantone306,
	backgroundColorHover: colors.easternBlue,
	borderColorFocus: colors.jordyBlue,
	color: colors.white
};

export const danger = {
	backgroundColor: colors.valencia,
	backgroundColorHover: colors.tallPoppy,
	borderColorFocus: colors.seaPink,
	color: colors.white
};

export const dangerLight = {
	backgroundColor: colors.cosmos,
	backgroundColorHover: colors.cosmos,
	borderColorFocus: colors.valencia,
	color: colors.valencia
};

export const success = {
	backgroundColor: colors.eucalyptus,
	backgroundColorHover: colors.forestGreen,
	borderColorFocus: colors.pastelGreen,
	color: colors.white
};

export const successLight = {
	backgroundColor: colors.snowyMint,
	backgroundColorHover: colors.snowyMint,
	borderColorFocus: colors.eucalyptus,
	color: colors.eucalyptus
};

export default {
	normal,
	primary,
	danger,
	dangerLight,
	success,
	successLight
};