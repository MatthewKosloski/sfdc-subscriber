import React, { Component } from 'react';

import TimeSeriesChart from './TimeSeriesChart';
import Container from './Container';

interface Props {

}

interface State {

}

export default class Chart extends Component<Props, State> {

    private _svgRef!: SVGSVGElement;
    private _chart!: TimeSeriesChart;

    constructor(props: Props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        this._chart = new TimeSeriesChart(this._svgRef);
        this._chart.init();
    }

    handleButtonClick() {
        this._chart.appendCircle('#df4747', 16, Date.now() - 10000);
    }

    render() {
        return(
            <>
				<button onClick={this.handleButtonClick} style={{display: 'block'}}>circle</button>
				<svg ref={(ref: SVGSVGElement) => this._svgRef = ref}></svg>
            </>
        );
    }
}