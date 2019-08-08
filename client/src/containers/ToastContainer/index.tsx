import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import { Toast } from '../../design-system/components';
import { removeToast } from '../../store/toast/actions';
import { Toast as IToast } from '../../store/toast/types';
import { AppState } from '../../store';

import Container from './Container';

export interface OwnProps {}

interface StateProps {
	toasts: IToast[]
}

interface DispatchProps {
	removeToast: typeof removeToast
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class ToastContainer extends Component<Props, State> {

	public renderToast(toast: Toast, index: number): JSX.Element {
		const key: string = uuidv1();
		return (
			<Toast
				key={key}
				onClick={this.props.removeToast.bind(null, index)}
				{...toast}
			/>
		);
	}

	public render(): JSX.Element {
		return (
			<Container>
				{this.props.toasts.map((toast, index) => {
					return this.renderToast(toast, index);
				})}
			</Container>
		);
	}

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps  => ({
	toasts: state.toasts
});

const dispatchProps: DispatchProps = {
	removeToast
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
	mapStateToProps,
	dispatchProps
)(ToastContainer);