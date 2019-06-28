import React, { Component, Fragment } from 'react';
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
            .duration(10000)
            .width(1200)
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
            <Fragment>
                <div style={{padding: '10px'}}>
                    <svg ref={this.svgRef}></svg>
                </div>
            </Fragment>
        );
    }
}