// real-time scaleLinear
import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

export default class RealTimeScaleLinear extends Component {

    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.drawGraph = this.drawGraph.bind(this);
    }

    componentDidMount() {
        this.drawGraph();
    }

    drawGraph() {
        var data = [];
        var width = 500;
        var height = 500;
        var globalX = 0;
        var duration = 1000;
        var max = 500;
        var step = 10;

        var svg = d3.select(this.svgRef.current)
        .attr('width', width + 50)
        .attr('height', height + 50);

        var xScale = d3.scaleLinear()
            .domain([0, 500])
            .range([0, 500]);

        var xAxis = d3.axisBottom()
            .scale(xScale);

        var xAxisGroup = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, 500)')
            .call(xAxis);
 
        // Append the holder for line svg and fill area
        var container = svg.append('g');
        // Main loop
        function tick() {
            // Generate new data
            var point = {
                x: globalX,
                y: ((Math.random() * 450 + 50) >> 0)
            };
            data.push(point);
            globalX += step;
            console.log(globalX);

            // update data here

            // Shift the svg left
            xScale.domain([globalX - (max - step), globalX]);
            xAxisGroup.transition()
                 .duration(duration)
                 .ease(d3.easeLinear)
                 .call(xAxis);
            container.attr('transform', null)
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .attr('transform', 'translate(' + xScale(globalX - max) + ')')
                .on('end', tick);
            // Remote old data (max 50 points)
            if (data.length > 50) data.shift();
        }
        tick();
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