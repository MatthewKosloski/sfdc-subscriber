export default (num: number): string | undefined => {
	if(num < 0) return;

	return (`00${num}`).slice(-2);

};