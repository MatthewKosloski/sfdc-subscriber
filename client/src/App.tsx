import React from 'react';

import Button from './Button';

import './App.css';

const App: React.FC = () => {
	return(
		<div className="app">
			<div className="app__inner">
				<Button>Normal Button</Button>
				<Button primary>Primary Button</Button>
			</div>
		</div>
	);
};

export default App;