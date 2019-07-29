export default `
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: inherit;
	}

	html {
		box-sizing: border-box;
	}

	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	img {
		max-width: 100%;
	}
`;