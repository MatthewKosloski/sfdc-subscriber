import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

export default class RealTimeScaleTime extends Component {

    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.drawGraph = this.drawGraph.bind(this);

        this.state = {
            // events: [
            //     {
            //         channel: '/event/Event_A__e',
            //         payloads: [/* push each payload to this array */]
            //     },
            //     {
            //         channel: '/event/Event_B__e',
            //         payloads: [/* push each payload to this array */]
            //     },
            //     // ...
            // ]
        }
    }

    componentDidMount() {
        this.drawGraph();
    }

    drawGraph() {

        const margin = {top: 40, right: 40, bottom: 40, left: 40};

        const width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const limit = 60,
            duration = 1000,
            now = new Date(Date.now() - duration);

        const svg = d3.select(this.svgRef.current)
            .attr('class', 'graph')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleTime()
            .domain([now - (limit - 2) * duration, now - duration])
            .range([0, width]);

        const xAxis = d3.axisBottom()
            .scale(xScale);

        const xAxisGroup = svg.append('g')
            .attr('class', 'graph__x-axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        const circleGroup = svg.append('g')
            .attr('class', 'graph__circles');

        const t = circleGroup.transition()
        .duration(350);

        const graphCircleRadius = 10;

        let data = [Date.now(), Date.now() - 15000];

        function tick() {

            const now = new Date();

            circleGroup.selectAll('circle')
                .data(data)
                .join(
                    enter => enter.append('circle')
                        .attr('fill', 'green')
                        .attr('cx', (d, i) => xScale(d))
                        .attr('r', 0)
                        .call(enter => enter.transition(t)
                            .attr('r', graphCircleRadius)),
                    update => update,
                    exit => exit
                        .call(exit => exit.transition(t)
                            .attr('r', 0)
                            .remove())
                )

            // add new data here

            // Shift the chart left
            xScale.domain([now - (limit - 2) * duration, now - duration])
            xAxisGroup.transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .call(xAxis);

            circleGroup.attr('transform', null)
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .attr('transform', `translate(${xScale(now - (limit - 1) * duration)})`)
                .on('end', tick);

            // delete old data here
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