import React, { Component } from 'react';
import * as d3 from 'd3';

import timeSeriesChart from './timeSeriesChart';

export default class Chart extends Component {

    constructor(props) {
        super(props);

        this.initGraph = this.initGraph.bind(this);

        this.svgRef = React.createRef();
        this.chart = timeSeriesChart()
            .circleColor('#df4747')
            .circleRadius(15)
            // .duration(60000)
            .width(980)
            .height(500);
    }

    componentDidMount() {
        this.initGraph();
    }

    componentDidUpdate() {
        this.chart.update(this.props.data);
    }

    initGraph() {
        d3.select(this.svgRef.current)
            .call(this.chart);       
    }

    render() {
        return(
            <svg ref={this.svgRef}></svg>
        );
    }
}