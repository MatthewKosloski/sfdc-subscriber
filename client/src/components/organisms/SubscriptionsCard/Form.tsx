import React from 'react';
import uuidv1 from 'uuid/v1';

import { TextInput, Label, Button } from '../../../design-system/components';

interface IFormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

interface IStateProps {
	value: string
}

class Form extends React.Component<IFormProps, IStateProps> {

	private _textInputId: string;

	constructor(props: IFormProps) {
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = { value: '' };

		this._textInputId = uuidv1();
	}

	public handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ value: e.target.value.toUpperCase() });
	}

	public render(): JSX.Element {
		return (
			<form onSubmit={this.props.onSubmit}>
				<Label htmlFor={this._textInputId}>
					Event API Name
				</Label>
				<div className="u-display-flex">
					<TextInput 
						className="u-mr-one"
						id={this._textInputId} 
						value={this.state.value}
						onChange={this.handleInputChange} />
					<Button 
						type="submit" 
						variant="success">
						Subscribe
					</Button>
				</div>
			</form>
		);
	}

}

export default Form;