import React, { Component } from 'react';

export default function withDefaultProps<TProps>(WrappedComponent: React.ElementType, 
    defaultProps: TProps) {
    return class extends Component {

        static defaultProps = defaultProps;

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}