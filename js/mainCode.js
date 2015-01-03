var handheld;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	handheld = true
	fileName = "top2000lijst2014.csv";
} else {
	handheld = false;
	fileName = "top2000lijst.csv";
}

//Width and Height of the SVG
var	wind = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	maxWidth = 1200, //Maximum width of the chart, regardless of screen size
	maxHeight = 800, //Maximum height of the chart, regardless of screen size
	w = Math.min(maxWidth, wind.innerWidth || e.clientWidth || g.clientWidth),
	h = Math.min(maxHeight, wind.innerHeight|| e.clientHeight|| g.clientHeight);

//Offsets needed to properly position elements
var xOffset = Math.max(0, ((wind.innerWidth || e.clientWidth || g.clientWidth)-maxWidth)/2),
	yOffset = Math.max(0, ((wind.innerHeight|| e.clientHeight|| g.clientHeight)-maxHeight)/2)

//Find the offsets due to other divs
var offsets = document.getElementById('chart').getBoundingClientRect();
	
//SVG locations
var margin = {top: 100, right: 20, bottom: 50, left: 40},
	padding = 40,
    width = w - margin.left - margin.right - padding,
    height = h - margin.top - margin.bottom - padding - offsets.top;

//Chart variables
var startYear,
	years, //save height per year
	rectWidth,
	rectHeight,
	rectCorner,
	chosenYear = 2014,
	chosenYearOld = 2014,
	optArray, //for search box
	inSearch = false, //is the search box being used - for tooltip
	selectedArtist; //for search box and highlighting
	
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	.tickFormat(d3.format("d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
	.tickFormat(d3.format("d"));
	
//Create color gradient
var hexColors = ["#007F24", "#62BF18", "#FFC800", "#FF5B13", "#E50000"];
var color = d3.scale.linear()
	.domain([1,50,100,500,1000,2000])
	.range(hexColors);

//Change note location
d3.select("#note")
	.style("left", (xOffset + 20)+"px");
	
//Change intro location
d3.select("#intro")
	.style("left", (xOffset + 20)+"px");
	
//Change search box
var searchWidth = Math.min(300,width/2);
d3.select("#searchBox")
	.style("left", (width/2 + xOffset + padding + margin.left - searchWidth/2)+"px")
	.style("width", searchWidth+"px");

if (handheld = false) {
	//Initiate slider
	var sliderWidth = 350;//Math.min(400,width/2);
	d3.select('#slider')
		.style("top", "20px")
		.style("left", (width/2 + xOffset + padding + margin.left - sliderWidth/2)+"px")
		.style("width", sliderWidth+"px")
		.call(d3.slider().axis(d3.svg.axis().ticks(16).tickFormat(d3.format("d")))
				.min(1999).max(2014).step(1).value(2014)
				.on("slide", function(evt, value) {
					//reset search box
					document.getElementById('txtSearch').value = "";
					inSearch = false;
					//Show new rectangles
					chosenYear = value;
					updateDots(chosenYear);
				}));
}//if	
		
//Initiate outer chart SVG
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
//Container for all the rectangles
var dotContainer = svg.append("g").attr("class","dotContainer");
	
//Create title to show chosen year
var yearTitle = svg.append('text')                                     
	  .attr('x', width/2) 
	  .attr('y', -10)	  
	  .attr("class", "yearTitle")
	  .text(chosenYear);  
	
d3.csv(fileName, function(error, data) {
	
	//Convert to numeric values
	data.forEach(function(d) {
		d.release = +d.release;
		d.year = +d.year;
		d.position = +d.position;
	});

	//Save all artists for auto complete of search box
	var optArray_temp = [];
	for (var i = 0; i < data.length - 1; i++) {
		optArray_temp.push(data[i].artist);
	}//for
	optArray = ArrNoDupe(optArray_temp); //remove duplicates
	optArray = optArray.sort(); //sort
	//Initiate autocomplete
	$(function () {
		$("#txtSearch").autocomplete({
			source: optArray
		});
	});

	//Calculate domains of chart
	startYear = d3.min(data, function(d) { return d.release; });
	x.domain([startYear-1,d3.max(data, function(d) { return d.release; })+1]);//.nice();
	y.domain([0,100]).nice();
	
	//Keeps track of the height of each year
	years = d3.range(d3.min(x.domain()),d3.max(x.domain()))
		.map(function(d,i) {
		  return {
			year: d,
			number: 1
		  };
		});

	//Size of the "song" rectangles
	rectWidth = Math.floor(x.range()[1]/100);
	rectHeight = Math.min(3,Math.floor(y.range()[0]/100));
	rectCorner = rectHeight/2;

	//Create x axis
	svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
		.append("text")
		  .attr("class", "label")
		  .attr("x", width/2)
		  .attr("y", 35)
		  .style("text-anchor", "middle")
		  .text("Year of release");

	//Create y axis
	svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("class", "label")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 8)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Number of songs")
	
	//Initiate all rectangles 			
	dotContainer.selectAll(".dot")
		  .data(data)
		.enter().append("rect")
		//.filter(function(d) { return d.year == chosenYear; })
		  .attr("class", "dot")
		  .attr("width", rectWidth)
		  .attr("height", rectHeight)
		  .attr("rx", rectCorner)
		  .attr("ry", rectCorner)
		  .style("fill", function(d) { return color(d.position); })
		  .on("mouseover", showTooltip)
		  .on("mouseout", hideTooltip)
		  .attr("x", function(d) { return (x(d.release) - rectWidth/2); })
		  .attr("y", y(0))
		  .attr("opacity",0);

	//Only show rectangles of starting year
	dotContainer.selectAll(".dot")
		.filter(function(d) { return d.year == chosenYear; })
		.attr("y", function(d) {return locateY(d);})
		.transition().duration(20).delay(function(d,i) {return i*1})
		.attr("opacity",1) ;
	
	//Create the legend
	createLegend();
	
});

//Change the year when moving the slider
function updateDots(chosenYear) {
	//Reset the heights
	years.forEach(function(value, index) {years[index].number = 1;});

	//Remove previous year bars
	dotContainer.selectAll(".dot")
		.filter(function(d) { return d.year == chosenYearOld; })
		.transition().duration(1000).delay(100)
		.attr("opacity",0)
		.attr("y", y(0));
	
	//Show chosen year bars	
	dotContainer.selectAll(".dot")
		.filter(function(d) { return d.year == chosenYear; })
		.attr("y", function(d) {return locateY(d);})
		.transition().duration(10).delay(function(d,i) {return 1101 + i*1})
		.attr("opacity",1);

	//Change year title
	yearTitle.text(chosenYear);
	//Save the current year
	chosenYearOld = chosenYear;
}// updateDots