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

var svg = d3.select('#nobel-bar .chart');

var bars = svg.selectAll('.bar')
            .data(nobelData);
            
bars = bars.enter(); /* returns placeholder nodes */

bars.append('rect')
    .classed('bar', true)
    .attr('width', 10)
    .attr('height', function(d){return d.value;})
    .attr('x', function(d, i) { return i * 12; });

var bar = d3.select('#nobel-bar .bar');
bar.attr('name', function(d, i){
    var sane_key = d.key.replace(/ /g, '_');
    
    console.log('__data__ is: ' + JSON.stringify(d) + ', index is ' + i)
    
    return 'bar__' + sane_key;
});

var buildCrudeBarchart = function() {
    
    var chartHolder = d3.select("#nobel-bar");
    
    var margin = {top:20, right:20, bottom:30, left:40};
    var boundingRect = chartHolder.node().getBoundingClientRect();
    var width = boundingRect.width - margin.left - margin.right,
    height = boundingRect.height - margin.top - margin.bottom;
    var barWidth = width/nobelData.length;
    
    var svg = d3.select('#nobel-bar').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").classed('chart', true)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    nobelData.forEach(function(d, i) {
        svg.append('rect').classed('bar', true)
            .attr('height', d.value)
            .attr('width', barWidth)
            .attr('y', height-d.value)
            .attr('x', i*(barWidth));
    });
};

// buildCrudeBarchart();
