import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

export default class Circles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [1, 2, 3]
        }

        this.initGraph = this.initGraph.bind(this);
        this.drawGraph = this.drawGraph.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        this.graphWidth = 500;
        this.graphHeight = 500;
        this.graphCircleRadius = 10;

        this.svgRef = React.createRef();
    }

    componentDidMount() {
        this.initGraph();
        this.drawGraph();
    }

    componentDidUpdate() {
        this.drawGraph();
    }

    handleAdd() {
        const { data } = this.state;
        let lastItem = data[data.length - 1];
        this.setState({
            data: [...data, lastItem++]
        });
    }

    handleRemove() {
        const { data } = this.state;
        this.setState({
            data: [...data.slice(0, data.length - 1)]
        });
    }

    initGraph() {
        const { svgRef, graphWidth, graphHeight, graphCircleRadius } = this;

        const svg = d3.select(svgRef.current)
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .style('border', '1px solid black');
        
        svg.append('g')
            .attr('transform', `translate(${graphCircleRadius}, ${graphCircleRadius})`)
            .classed('circles', true);
    }

    drawGraph() {

        const { svgRef, graphCircleRadius, state: { data } } = this;

        const circleGroup = d3.select(svgRef.current)
            .select('g.circles');

        const t = circleGroup.transition()
            .duration(350);
  
        circleGroup.selectAll('circle')
            .data(data)
            .join(
                enter => enter.append('circle')
                    .attr('fill', 'green')
                    .attr('cx', (_, i) => (graphCircleRadius * 2 * i) + 10 * i)
                    .attr('r', 0)
                    .call(enter => enter.transition(t)
                        .attr('r', graphCircleRadius)),
                update => update,
                exit => exit
                    .call(exit => exit.transition(t)
                        .attr('r', 0)
                        .remove())
            )
    }

    render() {
        return(
            <Fragment>
                <svg style={{display:'block'}} ref={this.svgRef}></svg>
                <button onClick={this.handleAdd}>Add</button>
                <button onClick={this.handleRemove}>Remove</button>
            </Fragment>
        );
    }
}