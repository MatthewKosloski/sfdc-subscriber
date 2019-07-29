import colors from './colors';

export type ButtonVariantStrings = 'normal' | 'primary' | 'danger' | 
'dangerLight' | 'success' | 'successLight';

export interface IButtonProps {
    variant?: ButtonVariantStrings,
    outline?: boolean,
    heavy?: boolean,
    small?: boolean,
    large?: boolean
};

export const defaultProps: IButtonProps = {
    variant: 'normal'
};

export const normal = {
	backgroundColor: colors.neutralBlack,
	color: colors.white
};

export const primary = {
	backgroundColor: colors.pantone306,
	color: colors.white
};

export const danger = {
	backgroundColor: colors.valencia,
	color: colors.white
};

export const dangerLight = {
	backgroundColor: colors.cosmos,
	color: colors.valencia
};

export const success = {
	backgroundColor: colors.eucalyptus,
	color: colors.white
};
 
export const successLight = {
	backgroundColor: colors.snowyMint,
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