import React, { Component } from 'react';

import TimeSeriesChart from './TimeSeriesChart';

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
        this._chart.appendCircle('#df4747', 1, Date.now() - 4000);
    }

    render() {
        return(
            <>
            <button onClick={this.handleButtonClick}>circle</button>
            <svg ref={(ref: SVGSVGElement) => this._svgRef = ref}></svg>
            </>
        );
    }
}