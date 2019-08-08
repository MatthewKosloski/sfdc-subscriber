import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import { Card } from '../../design-system/components';
import { CardListItems as SubscriptionsList, DataContainer } from '../../components';
import { AppState } from '../../store';
import { Subscription } from '../../store/subscriptions/types';
import { subscriptionRequest } from '../../store/subscriptions/actions';

// import randomColor from './randomColor';
import Container from './Container';
import Counter from './Counter';
import Form from './Form';
import SubscriptionsListItem from './SubscriptionsListItem';

export interface OwnProps {}

interface StateProps {
	subscriptions: Subscription[]
}

interface DispatchProps {
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

	public handleUnsubscribeClick(eventApiName: string): void {
		console.log(`Unsubscribe from event ${eventApiName}.`);
	}

	public handleFormSubmit(eventApiName: string): void {
		this.props.subscriptionRequest(eventApiName);
	}

	public renderSubscriptionItem(subscription: Subscription): JSX.Element {
		const key: string = uuidv1();

		const onUnsubscribeClick = this.handleUnsubscribeClick.bind(null,
			subscription.eventApiName);

		return (
			<SubscriptionsListItem
				{...subscription}
				key={key}
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
							{subscriptions.map((subscription) => {
								return this.renderSubscriptionItem(subscription);
							})}
						</SubscriptionsList>
					</DataContainer>
				</Card>
			</Container>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	subscriptions: state.subscriptions
});

const dispatchProps: DispatchProps = {
	subscriptionRequest
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(SubscriptionsCard);