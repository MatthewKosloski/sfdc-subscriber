import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';
import timeSeriesChart from './timeSeriesChart';

export default class UsingGraph extends Component {

    constructor(props) {
        super(props);
        this.svgRef = React.createRef();

        this.chart = timeSeriesChart();

        this.state = {
            data: []
        };

        this.initGraph = this.initGraph.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {
        this.initGraph();
    }

    componentDidUpdate() {
        this.chart.update(this.state.data);
    }

    initGraph() {
        d3.select(this.svgRef.current)
            .call(this.chart);       
    }

    handleAdd() {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        this.setState({
            data: [...this.state.data, randomNumber]
        });
    }

    handleClear() {
        this.setState({data: []});
    }

    render() {
        return(
            <Fragment>
                <div style={{padding: '10px'}}>
                    <svg ref={this.svgRef}></svg>
                    <button onClick={this.handleAdd}>Add</button>
                    <button onClick={this.handleClear}>Clear</button>
                </div>
            </Fragment>
        );
    }
}