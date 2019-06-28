import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

export default class RealTimeScaleTimeCircles extends Component {

    constructor(props) {
        super(props);

        this.svgRef = React.createRef();

        this.drawGraph = this.drawGraph.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        this.drawGraph();
    }

    handleAdd() {
        console.log('sdfsdf');
    }

    drawGraph() {
        const margin = {top: 40, right: 40, bottom: 40, left: 40};

        const width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const svg = d3.select(this.svgRef.current)
            .attr('class', 'graph')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

        var xScale = d3.scaleTime()
            .range([0, width]);

        var xAxis = d3.axisBottom(xScale);

        const xAxisGroup = svg.append('g')
            .attr('class', 'graph__x-axis')
            .attr('transform', 'translate(0,' + height + ')');

        const circleGroup = svg.append('g')
            .attr('class', 'graph__circles');

        d3.timer(() => {
            const now = Date.now();
            xScale.domain([now - 5000, now]);
            xAxisGroup.call(xAxis);
        });

        d3.select('button').on('click', function() {
            var time = Date.now();

            var circle = circleGroup.append('circle')
                .attr('r', 80)
                .attr('stroke-opacity', 0)
                .attr('cy', Math.random() * height);

            circle.transition('time')
                .duration(5000)
                .ease(d3.easeLinear)
                .attrTween('cx', function(d) { return function(t) { return xScale(time); }; })

            circle.transition()
                .duration(750)
                .ease(d3.easeCubicOut)
                .attr('r', 3.5)
                .attr('stroke-opacity', 1)
                .transition()
                .delay(5000 - 750 * 2)
                .ease(d3.easeCubicIn)
                .attr('r', 80)
                .attr('stroke-opacity', 0)
                .remove();
        });
    }

    render() {
        return(
            <Fragment>
                <div style={{padding: '10px'}}>
                    <svg ref={this.svgRef}></svg>
                    <button onClick={this.handleAdd}>Add Circle</button>
                </div>
            </Fragment>
        );
    }
}