import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card } from '../../design-system/components';
import { CardListItems as SubscriptionsList, DataContainer } from '../../components';
import { AppState } from '../../store';
import { Subscription } from '../../store/entities/subscriptions/types';
import { selectSubscriptions } from '../../store/entities/subscriptions/selectors';
import { subscriptionRequest, unsubscriptionRequest } from '../../store/entities/subscriptions/actions';

import Container from './Container';
import Counter from './Counter';
import Form from './Form';
import SubscriptionsListItem from './SubscriptionsListItem';

export interface OwnProps {}

interface StateProps {
	subscriptions: Subscription[] | null
}

interface DispatchProps {
	subscriptionRequest: typeof subscriptionRequest,
	unsubscriptionRequest: typeof unsubscriptionRequest
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class SubscriptionsCard extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.handleUnsubscribeClick = this.handleUnsubscribeClick.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.getSubscriptionsLength = this.getSubscriptionsLength.bind(this);
	}

	public handleUnsubscribeClick(eventApiName: string): void {
		this.props.unsubscriptionRequest(eventApiName);
	}

	public handleFormSubmit(eventApiName: string): void {
		this.props.subscriptionRequest(eventApiName);
	}

	public getSubscriptionsLength(): number {
		const { subscriptions } = this.props;
		return subscriptions ? subscriptions.length : 0;
	}

	public renderSubscriptionItem(subscription: Subscription): JSX.Element {
		const onUnsubscribeClick = this.handleUnsubscribeClick.bind(null,
			subscription.eventApiName);

		return (
			<SubscriptionsListItem
				{...subscription}
				key={subscription.eventApiName}
				onUnsubscribeClick={onUnsubscribeClick} />
		);
	}

	public render(): JSX.Element {
		const { subscriptions } = this.props;


		const sideHeaderComponent: React.ReactElement =
			<Counter count={this.getSubscriptionsLength()} />;

		const footerComponent: React.ReactElement =
			<Form onSubmit={this.handleFormSubmit} />;

		return(
			<Container>
				<Card
					titleText="Subscriptions"
					sideHeaderComponent={sideHeaderComponent}
					footerComponent={footerComponent}
					constrictBodyHeight
					noPaddedBody>
					<DataContainer
						hasData={this.getSubscriptionsLength() > 0}
						noDataText="Not subscribed to any Platform Events.">
						<SubscriptionsList>
							{subscriptions && subscriptions.map((subscription) =>
								this.renderSubscriptionItem(subscription)
							)}
						</SubscriptionsList>
					</DataContainer>
				</Card>
			</Container>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	subscriptions: selectSubscriptions(state)
});

const dispatchProps: DispatchProps = {
	subscriptionRequest,
	unsubscriptionRequest
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(SubscriptionsCard);