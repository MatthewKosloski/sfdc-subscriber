import React from 'react';
import uuidv1 from 'uuid/v1';

import { TextInput, Label, Button } from '../../design-system/components';

interface IFormProps {
	onSubmit: (eventApiName: string) => void
}

interface IStateProps {
	value: string
}

class Form extends React.Component<IFormProps, IStateProps> {

	private _textInputId: string;

	constructor(props: IFormProps) {
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = { value: '' };

		this._textInputId = uuidv1();
	}

	public handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ value: e.target.value });
	}

	public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		const trimmedValue: string = this.state.value.trim();

		if(trimmedValue) {
			this.props.onSubmit(trimmedValue);
			this.clearValue();
		}

	}

	public clearValue(): void {
		this.setState({value: ''});
	}

	public render(): JSX.Element {
		return (
			<form onSubmit={this.handleSubmit}>
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