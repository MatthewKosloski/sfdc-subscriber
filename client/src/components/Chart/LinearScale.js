import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

export default class LinearScale extends Component {

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

        const n = 40;

        const xScale = d3.scaleLinear()
            .domain([1, n])
            .range([0, width]);
        
        const yScale = d3.scaleLinear()
            .domain([1, 5])
            .range([height, 0]);

        const svg = d3.select(this.svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        const xAxis = d3.axisBottom(xScale).tickSize(12);
        const yAxis = d3.axisLeft(yScale).tickSize(12);
        
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y-axis')
            .call(yAxis); 

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