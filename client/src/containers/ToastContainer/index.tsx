import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import { Toast } from '../../design-system/components';
import { addToast, removeToast } from '../../store/entities/toast/actions';
import { ToastState } from '../../store/entities/toast/types';
import { selectToasts } from '../../store/entities/toast/selectors';
import { AppState } from '../../store';

import Container from './Container';

export interface OwnProps {}

interface StateProps {
	toasts: Toast[]
}

interface DispatchProps {
	addToast: typeof addToast,
	removeToast: typeof removeToast
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class ToastContainer extends Component<Props, State> {

	public renderToast(toast: Toast): JSX.Element {
		const key: string = uuidv1();
		return (
			<Toast
				key={key}
				onClick={() => {this.props.removeToast(toast.id);}}
				{...toast}
			/>
		);
	}

	public render(): JSX.Element {
		return (
			<Container>
				{this.props.toasts.map((toast) => {
					return this.renderToast(toast);
				})}
			</Container>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	toasts: selectToasts(state)
});

const dispatchProps: DispatchProps = {
	addToast,
	removeToast
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(ToastContainer);