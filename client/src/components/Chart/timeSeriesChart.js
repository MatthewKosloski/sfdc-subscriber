import * as d3 from 'd3';	

function timeSeriesChart() {	
	const margin = {top: 40, right: 40, bottom: 40, left: 40};	

		let actualWidth = 960, 	
		actualHeight = 500;	

		let width = actualWidth - margin.left - margin.right,	
		height = actualHeight - margin.top - margin.bottom;	

		const xScale = d3.scaleTime().range([0, width]),	
		xAxis = d3.axisBottom(xScale);	

		let circleRadius = 5,	
		circleColor = '#000';	

		let duration = 5000,	
		xAxisTickDuration = 75;	

		let svg;	

	function chart(selection) {	
		selection.each(function() {	
			svg = d3.select(this)	
				.attr('width', width + margin.left + margin.right)	
				.attr('height', height + margin.top + margin.bottom)	

			const chart = svg.append('g')	
				.attr('transform', `translate(${margin.left}, ${margin.top})`)	
				.attr('class', 'chart');	

			chart.append('g')	
				.attr('class', 'chart__circles');	

			const xAxisGroup = chart.append('g')	
				.attr('transform', `translate(0, ${height})`);	

			d3.timer(function() {	
				const now = Date.now();	
				xScale.domain([now - duration, now]);	
				xAxisGroup.transition()	
					.duration(xAxisTickDuration)	
					.ease(d3.easeLinear)	
					.call(xAxis);	
			});	
		});	
	}	

	chart.update = function(data) {	
		const circlesGroup = svg.select('g.chart__circles');	

		const time = Date.now();	

		const circle = circlesGroup.selectAll('circle')	
			.data(data).enter().append('circle')	
			.attr('r', 0)		
			.attr('fill', circleColor)	
			.attr('cy', Math.random() * height);	

		circle.transition('time')	
			.duration(duration)	
			.ease(d3.easeLinear)	
			.attrTween('cx', function() { return function() { return xScale(time); }; })	

		circle.transition()	
			.duration(750)	
			.ease(d3.easeCubicOut)	
			.attr('r', circleRadius)	
			.transition()	
			.delay(duration - 750 * 2)	
			.ease(d3.easeCubicIn)	
			.attr('r', 0)	
			.remove();	
    };	

	chart.circleRadius = function(value) {	
		if (!arguments.length) return circleRadius;	
		circleRadius = value;	
		return chart;	
	}	

	chart.circleColor = function(value) {	
		if (!arguments.length) return circleColor;	
		circleColor = value;	
		return chart;	
	}	

	chart.duration = function(value) {	
		if (!arguments.length) return duration;	
		duration = value;	
		return chart;	
	}	

	chart.width = function(value) {	
		if (!arguments.length) return actualWidth;	
		actualWidth = value;	
		width = actualWidth - margin.left - margin.right;	
		return chart;	
	}	

	chart.height = function(value) {	
		if (!arguments.length) return actualHeight;	
		actualHeight = value;	
		height = actualHeight - margin.top - margin.bottom	
		return chart;	
	}
   


   return chart;	
}	

 export default timeSeriesChart; 