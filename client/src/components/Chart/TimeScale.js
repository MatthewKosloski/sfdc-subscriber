import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

export default class TimeScale extends Component {

    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.drawGraph = this.drawGraph.bind(this);
    }

    componentDidMount() {
        this.drawGraph();
    }

    drawGraph() {
        const margin = {top: 40, right: 40, bottom: 40, left: 40};

        const width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const xScale = d3.scaleTime()
            .domain([new Date('2019-06-25T18:06:05Z'), new Date('2019-06-25T18:10:34Z')])
            .range([0, width]);

        const svg = d3.select(this.svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat('%I:%M:%S'))
            .tickSize(12);
        
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);
    }

    render() {
        return(
            <Fragment>
                <div style={{padding: '10px'}}>
                    <a href="https://github.com/d3/d3-scale/blob/v2.2.2/README.md#scaleTime">scaleTime</a>
                    <svg ref={this.svgRef}></svg>
                </div>
            </Fragment>
        );
    }
}