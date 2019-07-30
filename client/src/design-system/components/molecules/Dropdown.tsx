import React, { Component, Fragment } from 'react';

interface IProps {
    disabled?: boolean
};

interface IState {
    isOpen: boolean,
    focusedIndex: number
};

class Dropdown extends Component<IProps, IState> {

    static defaultProps: IProps = {
        disabled: false,
    }

    constructor(props: IProps) {
        super(props);

        this.handleTriggerClick = this.handleTriggerClick.bind(this);
        this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);

        this.state = {
            isOpen: false,
            focusedIndex: -1
        };
    }

    handleTriggerClick(e: React.MouseEvent<HTMLButtonElement>) {
        console.log('click');
        this.toggleDropdown();
    }

    handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
        const isTriggeredByEnter: boolean = e.key === 'Enter';
        const isTriggeredBySpacebar: boolean = e.key === ' ';

        if(isTriggeredByEnter || isTriggeredBySpacebar) {
            console.log('enter or spacebar');
            this.toggleDropdown();
        }
    }

    toggleDropdown() {
        console.log('toggleDropdown');
        this.setState((currentState: IState) => ({
            isOpen: !currentState.isOpen
        }));
    }

    render() {

        const { isOpen } = this.state;

        return(
            <Fragment>
                <button
                    onMouseDown={this.handleTriggerClick}
                    onKeyDown={this.handleTriggerKeyDown}
                    aria-expanded={isOpen}
                    aria-haspopup="true">
                        Filter by
                </button>
                <ul style={{display: isOpen ? 'block' : 'none'}}>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </Fragment>
        );
    }

}

export default Dropdown;