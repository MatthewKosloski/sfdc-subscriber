import React, { Component } from 'react';
import { ReactComponent as Chevron } from './chevron.svg';

import Container from './Container';
import Trigger from './Trigger';
import Menu from './Menu';

enum Keys {
	Enter = 'Enter',
	Escape = 'Escape',
	Tab = 'Tab',
	Spacebar = ' ',
	Down = 'ArrowDown',
	Up = 'ArrowUp'
}

interface IProps {
	buttonText: string,
	options: string[],
	onChange: (index: number) => any,
	disabled?: boolean
};

interface IState {
    isOpen: boolean,
	focusedIndex: number
};

class Dropdown extends Component<IProps, IState> {

	private _menuItemRefs: HTMLLIElement[];
	private _triggerRef: React.RefObject<HTMLButtonElement>;

	constructor(props: IProps) {
		super(props);

		// bind 'this' to prototype methods
		this._addRef = this._addRef.bind(this);
		this._handleTriggerClick = this._handleTriggerClick.bind(this);
		this._handleTriggerKeyDown = this._handleTriggerKeyDown.bind(this);
		this._handleMenuKeyDown = this._handleMenuKeyDown.bind(this);
		this.updateFocusedIndex = this.updateFocusedIndex.bind(this);

		// initialize private instance variables
		this._menuItemRefs = [];
		this._triggerRef = React.createRef<HTMLButtonElement>();

		// set initial state
		this.state = { isOpen: false, focusedIndex: -1 };

	}

	componentDidMount() {
		console.log(this._menuItemRefs);
	}

	/**
	 * React lifecycle method. Is invoked when state or props change.
	 * @param prevProps The props from last render
	 * @param prevState The state from last render
	 */
	public componentDidUpdate(prevProps: IProps, prevState: IState): void {
		const hasNewFocusedIndex: boolean = prevState.focusedIndex
		!== this.state.focusedIndex;
		const didClose: boolean = this.state.isOpen === false;


		// focus on menu item when focus index changes
		if(hasNewFocusedIndex) {
			this.focusMenuItem(this.state.focusedIndex);
		}

		// focus on the trigger when menu closes
		if(didClose) {
			this.focusTrigger();
		}

	}

	/**
	 * Indicates if the dropdown menu is open.
	 */
	public isOpen(): boolean {
		return this.state.isOpen;
	}

	/**
	 * Indicates if the dropdown menu is closed.
	 */
	public isClosed(): boolean {
		return !this.state.isOpen;
	}

	/**
	 * Opens the dropdown menu.
	 */
	public open(): void {
		this.setState({isOpen: true});
	}

	/**
	 * Closes the dropdown menu.
	 */
	public close(): void {
		this.setState({isOpen: false, focusedIndex: -1});
	}

	/**
	 * Opens the dropdown menu if it is closed;
	 * Closes the dropdown menu if it is open.
	 */
	public toggleDropdown(): void {
		if(this.isOpen()) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Focuses on the ref with index $focusedIndex.
	 * @param focusedIndex The index of the ref that needs focus.
	 */
	public focusMenuItem(focusedIndex: number): void {
		const currentRef: HTMLLIElement =
			this._menuItemRefs[focusedIndex];
		if(currentRef) {
			currentRef.focus();
		}
	}

	/**
	 * Focuses on the menu trigger element.
	 */
	public focusTrigger(): void {
		const currentTriggerRef: HTMLButtonElement | null = this._triggerRef.current;
		if(currentTriggerRef) {
			currentTriggerRef.focus();
		}
	}

	/**
	 * Validates the focused index by making sure it is in bounds.
	 * @param dirtyFocusedIndex The focused index that needs validation.
	 */
	public validateFocusedIndex(dirtyFocusedIndex: number): number {
		const minIndex: number = 0,
			maxIndex: number = this._menuItemRefs.length - 1;

		const isTooSmall: boolean = dirtyFocusedIndex < minIndex,
			isTooLarge: boolean = dirtyFocusedIndex > maxIndex;

		let validatedFocusedIndex: number = 0;

		if(isTooSmall) {
			validatedFocusedIndex = maxIndex;
		} else if(isTooLarge) {
			validatedFocusedIndex = minIndex;
		} else {
			validatedFocusedIndex = dirtyFocusedIndex;
		}

		return validatedFocusedIndex;
	}

	/**
	 * Updates the focused index.
	 * @param newFocusedIndex
	 */
	public updateFocusedIndex(newFocusedIndex: number): void {
		const validatedFocusedIndex: number =
			this.validateFocusedIndex(newFocusedIndex);

		this.setState({focusedIndex: validatedFocusedIndex});
	}

	/**
	 * Applies focus to the next menu item in the dropdown.
	 */
	public focusNextMenuItem(): void {
		this.updateFocusedIndex(this.state.focusedIndex + 1);
	}

	/**
	 * Applies focus to the previous menu item in the dropdown.
	 */
	public focusPreviousMenuItem(): void {
		this.updateFocusedIndex(this.state.focusedIndex - 1);
	}

	public renderChildren(): JSX.Element[] {
		return this.props.options.map((option, i) => (
			<li
				key={i}
				ref={this._addRef}
				tabIndex={-1}
				role="menuitem">
				{option}
			</li>
		));
	}

    public render() {

		const { buttonText } = this.props;
		const { isOpen } = this.state;

        return(
            <Container>
                <Trigger
					ref={this._triggerRef}
					onMouseDown={this._handleTriggerClick}
					onKeyDown={this._handleTriggerKeyDown}
                    aria-expanded={isOpen}
					aria-haspopup="true"
					variant="primary"
					outline>
						{buttonText}
						<Chevron />
                </Trigger>
				<Menu
					onKeyDown={this._handleMenuKeyDown}
					aria-hidden={!isOpen}
					isOpen={isOpen}
					role="menu">
					{this.renderChildren()}
                </Menu>
            </Container>
        );
	}

	/**
	 * Handle onMouseDown event from trigger.
	 */
	private _handleTriggerClick(): void {
		this.toggleDropdown();
	}

	/**
	 * Handle keyDown event from trigger.
	 * @param e An object containing information on the event.
	 */
	private _handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void {
		switch(e.key) {
			case Keys.Enter:
			case Keys.Spacebar: {
				this.toggleDropdown();
				break;
			}
			case Keys.Escape: {
				if(this.isOpen()) {
					this.close();
				}
				break;
			}
			case Keys.Down: {
				if(this.isOpen()) {
					this.focusNextMenuItem();
				}
			}

		}
	}

	/**
	 * Handle KeyDown event from a menu item.
	 * @param e An object containing information on the event.
	 */
	private _handleMenuKeyDown(e: React.KeyboardEvent<HTMLUListElement>): void {
		switch(e.key) {
			case Keys.Down: {
				this.focusNextMenuItem();
				break;
			}
			case Keys.Up: {
				this.focusPreviousMenuItem();
				break;
			}
			case Keys.Escape:
			case Keys.Tab: {
				if(this.isOpen()) {
					this.close();
				}
			}
		}
	}

	/**
	 * Stores a reference to the menu item. Storing it allows
	 * us to perform DOM manipulation on it later (e.g., focusing on it).
	 */
	private _addRef(menuItemRef: HTMLLIElement): void {
		if(this._menuItemRefs) {
			this._menuItemRefs = [...this._menuItemRefs, menuItemRef];
		}
	}

}

export default Dropdown;