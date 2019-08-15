import * as d3 from 'd3';

interface Options {
	circlesGroupClass: string,
	circleTransitionDuration: number,
	duration: number,
	margin: Spacing,
	outerHeight: number,
	outerWidth: number,
	xAxisTickDuration: number
}

interface Spacing {
    top: number,
    right: number,
    bottom: number,
    left: number
}

class TimeSeriesChart {

	private _innerHeight: number;
	private _options: Options;
	private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    private _xScale: d3.ScaleTime<number, number>;
    private _xAxis: d3.Axis<number | Date | { valueOf(): number; }>;

    constructor(node: any, options: Options = {
		circlesGroupClass: 'chart__circles',
		circleTransitionDuration: 250,
		duration: 60000,
		margin: {top: 0, right: 0, bottom: 20, left: 0},
		outerHeight: 400,
		outerWidth: 381,
		xAxisTickDuration: 75
	}) {

		this._svg = d3.select(node);
		this._options = options;

		const { outerHeight, margin } = options;

		this._innerHeight = outerHeight - margin.top - margin.bottom;
        this._xScale = d3.scaleTime().range([0, this._innerHeight]);
		this._xAxis = d3.axisBottom(this._xScale);
    }

    public init(): void {

		const { outerWidth, outerHeight, margin, duration,
			xAxisTickDuration, circlesGroupClass } = this._options;

		this._svg.attr('viewBox', `0 0 ${outerWidth} ${outerHeight}`);

		const chart = this._svg.append('g')
			.attr('transform', `translate(${margin.left}, 0)`);

		chart.append('g')
			.attr('class', circlesGroupClass)
			.attr('transform', `translate(-${margin.left}, -${margin.top})`);

        const xAxisGroup = chart.append('g')
            .attr('transform', `translate(0, ${this._innerHeight})`);

        d3.timer(() => {
            const now = Date.now();
            this._xScale.domain([now - duration, now]);
            xAxisGroup.transition()
                .duration(xAxisTickDuration)
                .ease(d3.easeLinear)
                .call(this._xAxis);
        });
    }

	public appendCircle(fill: string = 'black', time: number = Date.now(),
	yMultiple: number = 16, diameter: number = 16): void {

		const { duration, circlesGroupClass, circleTransitionDuration } = this._options;

        const now: number = Date.now();
        const timeDiff: number = now - time;

        if(timeDiff >= duration) {
            return;
		}

		const radius = diameter / 2;
        const circlesGroup = this._svg.select(`g.${circlesGroupClass}`);

        const circle = circlesGroup.append('circle')
            .attr('r', 0)
            .attr('stroke-opacity', 0)
            .attr('fill', fill)
            .attr('cy', yMultiple * diameter);

        circle.transition('time')
            .duration(duration)
            .ease(d3.easeLinear)
            .attrTween('cx', () => () => String(this._xScale(time)));

        circle.transition()
            .duration(circleTransitionDuration)
            .ease(d3.easeCubicOut)
            .attr('r', radius)
            .attr('stroke-opacity', 1)
        .transition()
            .delay(duration - timeDiff - (circleTransitionDuration * 2))
            .ease(d3.easeCubicIn)
            .attr('r', 0)
            .attr('stroke-opacity', 0)
            .remove();
    }


}

export default TimeSeriesChart;