export type Color = 'black' |
	'white' |
	'neutralBlack' |
	'pantoneCoolGray1' |
	'pantoneCoolGray4' |
	'gallery' |
	'alabaster' |
	'pantone306' |
	'tealBlue' |
	'valencia' |
	'cosmos' |
	'eucalyptus' |
	'snowyMint';

type Colors = {
	[key in Color]: string
};

const colors: Colors = {
	black: '#000',
	white: '#fff',
	neutralBlack: '#3d3d3f',
	pantoneCoolGray1: '#b9b7b9',
	pantoneCoolGray4: '#b9b7b9',
	gallery: '#eaeaea',
	alabaster: '#f9f9fa',
	pantone306: '#1db3e7',
	tealBlue: '#005c79',
	valencia: '#D73A49',
	cosmos: '#ffdce0',
	eucalyptus: '#28a745',
	snowyMint: '#dcffe4'
};

export default colors;