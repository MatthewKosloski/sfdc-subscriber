import React, { Component } from 'react';

import TimeSeriesChart from './TimeSeriesChart';

interface Props {
	lastEvent: {
		createdDate: string | null
		color: string | null
	}
}

interface State {

}

export default class Chart extends Component<Props, State> {

    private _svgRef!: SVGSVGElement;
    private _chart!: TimeSeriesChart;

    componentDidMount() {
        this._chart = new TimeSeriesChart(this._svgRef);
		this._chart.init();
	}

	componentDidUpdate(prevProps: Props) {
		const { lastEvent } = this.props;
		const { color, createdDate } = lastEvent;
		if(lastEvent !== prevProps.lastEvent && color && createdDate) {
			const createdTime = new Date(createdDate).getTime();
			this._chart.appendCircle(color, createdTime);
		}
	}

    render() {
        return (
			<svg ref={(ref: SVGSVGElement) => this._svgRef = ref}></svg>
		);
    }
}