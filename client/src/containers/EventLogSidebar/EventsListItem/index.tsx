import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { toHhMmSs } from '../../../utils';
import { AppState } from '../../../store';
import { Titles } from '../../../design-system/components';
import { Event } from '../../../store/entities/events/types';
import { selectSubscriptionById } from '../../../store/entities/subscriptions/selectors';
import { removeEvent } from '../../../store/entities/events/actions';

import Container from './Container';
import Timestamp from './Timestamp';
import ClickableArea from './ClickableArea';
import RemoveButton from './RemoveButton';

export interface OwnProps extends Event {}

interface StateProps {
	color?: string
}

interface DispatchProps {
	removeEvent: typeof removeEvent
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
	isOpen: boolean
}

class EventsListItem extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = { isOpen: false };

		this.renderCustomField = this.renderCustomField.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleRemoveClick = this.handleRemoveClick.bind(this);
	}

	public renderCustomField(key: string): JSX.Element | undefined {
		if(key === 'Log_Message__c') return;
		return (
			<li key={key}>{key}: {this.props.customFields[key]}</li>
		);
	}

	public handleClick(): void {
		this.setState((prevState: State) => ({
			isOpen: !prevState.isOpen
		}));
	}

	public handleRemoveClick(): void {
		this.props.removeEvent.call(null, this.props.id as string);
	}

	render() {

		const {
			color,
			createdDate,
			subscriptionId,
			customFields
		} = this.props;

		const { isOpen } = this.state;

		return(
			<Container>
				<Timestamp
					dateTime={createdDate}
					color={color}>
					{toHhMmSs(createdDate)}
				</Timestamp>
				<ClickableArea
					tabIndex={0}
					isOpen={isOpen}
					onKeyUp={this.handleClick}
					onClick={this.handleClick}>
					<Titles
						titleAs="h3"
						titleText={subscriptionId as string}
						subtitleText={customFields.Log_Message__c} />
					{isOpen &&
						<Fragment>
							<ul>
								{Object.keys(customFields).map((key) =>
									this.renderCustomField(key)
								)}
							</ul>
							<RemoveButton onClick={this.handleRemoveClick} />
						</Fragment>
					}
				</ClickableArea>
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	color: selectSubscriptionById(state, ownProps.subscriptionId).color
});

const dispatchProps: DispatchProps = {
	removeEvent
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(EventsListItem);