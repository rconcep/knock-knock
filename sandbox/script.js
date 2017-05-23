var nobelData = [
    {key:'United States', value:336},
    {key:'United Kingdom', value:98},
    {key:'Germany', value:79},
    {key:'France', value:60},
    {key:'Sweden', value:29},
    {key:'Switzerland', value:23},
    {key:'Japan', value:21},
    {key:'Russia', value:19},
    {key:'Netherlands', value:17},
    {key:'Austria', value:14}
];

// GETTING THE CHART DIMENSIONS
var chartHolder = d3.select("#nobel-bar");
var margin = {top:20, right:20, bottom:30, left:40};
var boundingRect = chartHolder.node().getBoundingClientRect();
var width = boundingRect.width - margin.left - margin.right,
height = boundingRect.height - margin.top - margin.bottom;

// SCALES WITH RANGES
var xScale = d3.scale.ordinal()
    .rangeBands([0, width], 0.1);
var yScale = d3.scale.linear()
    .rangeRound([height, 0]);

// CHART-HOLDER GROUP
var svg = d3.select('#nobel-bar').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").classed('chart', true)
    .attr("transform", "translate(" +
        margin.left + "," + margin.top + ")");

// axis
var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(10);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

svg.append("g")
    .attr("class", "y axis")

// OUR UPDATE FUNCTION
var update = function(data){
    // UPDATE SCALE DOMAINS FOR CHANGED DATA
    xScale.domain( data.map(function(d) { return d.key; }) );
    yScale.domain([0, d3.max(data.map(function(d) {
        return d.value;
    }))]);
    // JOIN DATA TO BAR-GROUP
    var bars = svg.selectAll('.bar')
    .data(data);
    
    // APPEND BARS FOR UNBOUND DATA
    bars.enter()
        .append('rect').classed('bar', true);
        
    // UPDATE ALL BARS WITH BOUND DATA
    bars.attr('height', function(d, i){
        return height-yScale(d.value); })
            .attr('width', xScale.rangeBand())
            .attr('y', function(d) {
                return yScale(d.value);
            })
            .attr('x', function(d, i) {
                return xScale(i);
            });
    // REMOVE ANY BARS WITHOUT BOUND DATA
    bars.exit().remove();
    
    //
    svg.select('.x.axis')
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    
    svg.select('.y.axis')
        .call(yAxis);
    
    // label
    var X_PADDING_LEFT = 20;
    
    xScale = d3.scale.ordinal()
        .rangeBands([X_PADDING_LEFT, width], 0.1);
    
    svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr('id', 'y-axis-label')
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text('Number of winners');
};

update(nobelData);