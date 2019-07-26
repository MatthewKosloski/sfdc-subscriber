import { Step } from './spacing';

// export enum Breakpoint {
// 	XS = '0rem',
// 	SM = '31.25rem',
// 	MD = '48rem',
// 	LG = '62.5rem',
// 	XL = '80rem'
// };

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Breakpoints = {[key in Breakpoint]: string};

type Layout = {
	breakpoints: Breakpoints,
	containerWidth: string,
	gridGutter: Step,
	gridCols: number,
	gridSizes: string[]
}

const layout: Layout = {
	breakpoints: {
		xs: '0rem', // 0px
		sm: '31.25rem', // 500px
		md: '48rem', // 768px
		lg: '62.5rem', // 1000px
		xl: '80rem' // 1280px
	},
	containerWidth: '960px',
	gridGutter: Step.One,
	gridCols: 12,
	get gridSizes() {
		return Object.keys(this.breakpoints);
	}
};

export default layout;