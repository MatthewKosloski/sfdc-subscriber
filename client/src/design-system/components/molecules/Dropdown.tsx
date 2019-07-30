import React, { Component, Fragment } from 'react';
import uuidv1 from 'uuid/v1';

interface IProps {
	disabled?: boolean,
	options: string[]
};

interface IState {
    isOpen: boolean,
	focusedIndex: number
};

class Dropdown extends Component<IProps, IState> {

	private _refs: HTMLLIElement[] = [];

	constructor(props: IProps) {
		super(props);

		this.handleTriggerClick = this.handleTriggerClick.bind(this);
		this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
		this.handleMenuKeyUp = this.handleMenuKeyUp.bind(this);
		this.addRef = this.addRef.bind(this);

        this.state = {
            isOpen: false,
			focusedIndex: -1
		};
	}

	componentDidUpdate(prevProps: IProps, prevState: IState) {
		const hasNewFocusedIndex: boolean = prevState.focusedIndex
		!== this.state.focusedIndex;

		if(hasNewFocusedIndex) {

			const oldRef: HTMLLIElement = this._refs[prevState.focusedIndex];
			const currentRef: HTMLLIElement = this._refs[this.state.focusedIndex];

			if(oldRef) {
				oldRef.tabIndex = -1;
			}

			if(currentRef) {
				currentRef.focus();
			}
		}
	}

	handleTriggerClick(e: React.MouseEvent<HTMLButtonElement>) {
		this.openDropdown();
	}

	handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
		switch(e.key) {
			case ' ':
			case 'Enter':
			case 'Tab': {
				const isDropdownClosed: boolean = !this.state.isOpen;
				if(isDropdownClosed) {
					this.openDropdown();
				} else {
					this.closeDropdown();
				}
				break;
			}
			case 'Escape': {
				this.closeDropdown();
				break;
			}
			default: {
				break;
			}
		}
	}

	handleMenuKeyUp(e: React.KeyboardEvent<HTMLUListElement>) {
		switch(e.key) {
			case 'ArrowUp': {
				console.log('ArrowUp on Menu');
				this.updateFocusedIndex(this.state.focusedIndex - 1);
				break;
			}
			case 'ArrowDown': {
				console.log('ArrowDown on Menu');
				this.updateFocusedIndex(this.state.focusedIndex + 1);
				break;
			}
			case 'Escape': {
				this.closeDropdown();
				break;
			}
			default: {
				break;
			}
		}
	}

	openDropdown() {
		this.setState({isOpen: true});
		this.updateFocusedIndex(0);
	}

	closeDropdown() {
		this.setState({isOpen: false});
		this.updateFocusedIndex(-1);
	}

	addRef(ref: HTMLLIElement | null) {
		if(ref) {
			this._refs = [...this._refs, ref];
		}
	}

	updateFocusedIndex(newFocusedIndex: number) {
		const minIndex: number = 0,
			maxIndex: number = this._refs.length - 1;

		if(newFocusedIndex < minIndex) {
			newFocusedIndex = maxIndex;
		} else if(newFocusedIndex > maxIndex) {
			newFocusedIndex = minIndex;
		}

		this.setState({focusedIndex: newFocusedIndex});
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
				<ul
					aria-hidden={!isOpen}
					onKeyUp={this.handleMenuKeyUp}
					role="menu"
					style={{display: isOpen ? 'block' : 'none'}}>
					{this.props.options.map((option) => (
						<li
							key={`${Date.now()}-${uuidv1()}}`}
							ref={this.addRef}
							tabIndex={-1}
							role="menuitem">
							{option}
						</li>
					))}
                </ul>
            </Fragment>
        );
    }

}

export default Dropdown;