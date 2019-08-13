import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card } from '../../design-system/components';
import { CardListItems as SubscriptionsList, DataContainer } from '../../components';
import { AppState } from '../../store';
import { Subscription } from '../../store/entities/subscriptions/types';
import { selectSubscriptions } from '../../store/entities/subscriptions/selectors';
import { addSubscription, subscriptionRequest, removeSubscription } from '../../store/entities/subscriptions/actions';

import Container from './Container';
import Counter from './Counter';
import Form from './Form';
import SubscriptionsListItem from './SubscriptionsListItem';

export interface OwnProps {}

interface StateProps {
	subscriptions: Subscription[]
}

interface DispatchProps {
	addSubscription: typeof addSubscription,
	removeSubscription: typeof removeSubscription,
	subscriptionRequest: typeof subscriptionRequest
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class SubscriptionsCard extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.handleUnsubscribeClick = this.handleUnsubscribeClick.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	componentDidMount() {
		this.props.addSubscription({
			eventApiName: 'Dummy_Subscription_1__e'
		});
		this.props.addSubscription({
			eventApiName: 'Dummy_Subscription_2__e'
		});
		this.props.addSubscription({
			eventApiName: 'Dummy_Subscription_3__e'
		});
		// this.props.removeSubscription('foobar123');
	}

	componentDidUpdate() {
		console.log(this.props.subscriptions);
	}

	public handleUnsubscribeClick(eventApiName: string): void {
		console.log(`Unsubscribe from event ${eventApiName}.`);
	}

	public handleFormSubmit(eventApiName: string): void {
		this.props.subscriptionRequest(eventApiName);
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
			<Counter count={subscriptions.length} />;

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
						hasData={subscriptions.length > 0}
						noDataText="Not subscribed to any Platform Events.">
						<SubscriptionsList>
							{subscriptions.map((subscription) =>
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
	addSubscription,
	removeSubscription,
	subscriptionRequest
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(SubscriptionsCard);