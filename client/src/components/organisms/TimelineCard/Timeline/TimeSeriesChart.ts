import * as d3 from 'd3';

interface Margin {
    top: number,
    right: number,
    bottom: number,
    left: number
}

class TimeSeriesChart {

    private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    private _actualWidth: number;
    private _actualHeight: number;
    private _width: number;
    private _height: number;
    private _margin: Margin;
    private _xScale: d3.ScaleTime<number, number>;
    private _xAxis: d3.Axis<number | Date | { valueOf(): number; }>;
    private _duration: number;
    private _xAxisTickDuration: number;

    constructor(node: any, width: number = 960, height: number = 500, duration: number = 5000, 
        xAxisTickDuration: number = 75, margin: Margin = { top: 40, right: 40, bottom: 40, left: 40 }) {
        this._svg = d3.select(node);
        this._actualWidth = width;
        this._actualHeight = height;
        this._margin = margin;
        this._width = this._actualWidth - this._margin.left - this._margin.right;
        this._height = this._actualHeight - this._margin.top - this._margin.bottom;
        this._xScale = d3.scaleTime().range([0, this._width]);
        this._xAxis = d3.axisBottom(this._xScale);
        this._duration = duration;
        this._xAxisTickDuration = xAxisTickDuration;
    }

    public init(): void {
        this._svg
            .attr('width', this._width + this._margin.left + this._margin.right)
            .attr('height', this._height + this._margin.top + this._margin.bottom);

        const chart = this._svg.append('g')
            .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`);
    
        chart.append('g')
            .attr('class', 'chart__circles');

        const xAxisGroup = chart.append('g')	
            .attr('transform', `translate(0, ${this._height})`);	

        d3.timer(() => {	
            const now = Date.now();	
            this._xScale.domain([now - this._duration, now]);	
            xAxisGroup.transition()	
                .duration(this._xAxisTickDuration)	
                .ease(d3.easeLinear)	
                .call(this._xAxis);	
        });	
    }

    public appendCircle(fill: string = 'black', y: number = Math.random() * this._height, 
    time: number = Date.now(), radius: number = 12): void {

        const now: number = Date.now();
        const timeDiff: number = now - time;

        if(timeDiff > this._duration) {
            return;
        }

        const circlesGroup = this._svg.select('g.chart__circles');

        const circle = circlesGroup.append('circle')
            .attr('r', 0)
            .attr('stroke-opacity', 0)
            .attr('fill', fill)
            .attr('cy', y);
    
        circle.transition('time')
            .duration(this._duration)
            .ease(d3.easeLinear)
            .attrTween('cx', () => () => String(this._xScale(time)));
    
        circle.transition()
            .duration(250)
            .ease(d3.easeCubicOut)
            .attr('r', radius)
            .attr('stroke-opacity', 1)
        .transition()
            .delay(this._duration - timeDiff - (250 * 2))
            .ease(d3.easeCubicIn)
            .attr('r', 0)
            .attr('stroke-opacity', 0)
            .remove();
    }


}

export default TimeSeriesChart;