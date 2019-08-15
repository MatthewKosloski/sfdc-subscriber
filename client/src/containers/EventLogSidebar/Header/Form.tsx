import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

import { Label, Select } from '../../../design-system/components';

interface IFormProps {}
interface IFormState {
    value: string
}

class Form extends Component<IFormProps, IFormState> {

    private _id: string;

    constructor(props: IFormProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };

        this._id = uuidv1();
    }

    public handleChange(e: any) {
        this.setState({ value: e.target.value });
    }

    public render() {
        return (
            <form>
                <Label htmlFor={this._id} inline>Filter by:</Label>
                <Select
                    id={this._id}
                    value={this.state.value}
                    onChange={this.handleChange}
                    options={[
                        {text: 'All'},
                        {text: 'Event 1'}
                    ]}
                />
            </form>
        );
    }

}

export default Form;