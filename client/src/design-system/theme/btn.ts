import colors from './colors';

export enum Button {
	Default = 'default',
	Primary = 'primary',
	Danger = 'danger',
	DangerLight = 'dangerLight',
	Success = 'success',
	SuccessLight = 'successLight'
};

// export type Button = 'default' |
// 	'primary' |
// 	'danger' |
// 	'dangerLight' |
// 	'success' |
// 	'successLight';


type Btn = {
	[key in Button]: {
		// TODO: change value of key from type string to something more strict
		[key in 'backgroundColor' | 'color']: string
	}
};

const btn: Btn = {
	default: {backgroundColor: colors.neutralBlack, color: colors.white},
	primary: {backgroundColor: colors.pantone306, color: colors.white},
	danger: {backgroundColor: colors.valencia, color: colors.white},
	dangerLight: {backgroundColor: colors.cosmos, color: colors.valencia},
	success: {backgroundColor: colors.eucalyptus, color: colors.white},
	successLight: {backgroundColor: colors.snowyMint, color: colors.eucalyptus}
};

export default btn;