
//Check if people are viewing from a handheld device
//If yes, only load the 2014 data to speed things up
//Trying to figure out how to detect touch devices (exept for laptops with touch screens)
window.mobileAndTabletcheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})
		(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}//function mobileAndTabletcheck
var handheld = window.mobileAndTabletcheck();

var fileName;	
if(handheld) {
	fileName = (is_IE | is_Firefox ? "top2000lijst2014IE.csv" : "top2000lijst2014.csv"); //IE & Firefox cannot read Unicode saved files
} else {
	fileName = (is_IE | is_Firefox ? "top2000lijstIE.csv" : "top2000lijst.csv");
}//else

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
var margin = {top: 200, right: 20, bottom: 50, left: 40},
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
	.style("top", (height + margin.top + margin.bottom + 40)+"px")
	.style("left", (xOffset + 20)+"px");
	
//Change intro location
d3.select("#intro")
	.style("left", (xOffset + 20)+"px");

//If the user us using a handheld, do not show the slider
var sliderWidth = 350;
if (handheld == false) {
	//Initiate slider
	d3.select('#slider')
		.style("left", (width/2 + xOffset + padding + margin.left - sliderWidth/2)+"px")
		.style("width", sliderWidth+"px")
		.call(d3.slider().axis(d3.svg.axis().ticks(16).tickFormat(d3.format("d")))
				.min(1999).max(2014).step(1).value(2014)
				.on("slide", function(evt, value) {
					//reset search
					inSearch = false;
					//Show new rectangles
					chosenYear = value;
					updateDots(chosenYear)
				}));
				
	//If the user clicks anywhere while in search mode, remove the search
	d3.select("body").on("click", function() { 
		if(inSearch) {
			inSearch = false;
			searchArtist("");
		}		
	});
} else {
	var handheldText = d3.select("#slider")
		  .style("left", (width/2 + xOffset + padding + margin.left - sliderWidth/2)+"px") 
		  .style("width", sliderWidth+"px")
		  .append('text')                                     
		  .attr("text-align", "center")
		  .text("If you want to see other years, please check this page on a pc/laptop"); 
}//else
		
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

//Change search box
var searchWidth = Math.min(300,width/2);
d3.select("#searchBoxWrapper")
	.style("left", (width/2 + xOffset + padding + margin.left - searchWidth/2)+"px")
	.style("width", searchWidth+"px");
	
var updateDots;

d3.csv("data/"+fileName, function(error, data) {

	//Convert to numeric values
	//data.forEach(function(d) {
	for(var i = 0; i < data.length; i++) { //Faster?
		data[i].release = +data[i].release;
		data[i].year = +data[i].year;
		data[i].position = +data[i].position;
		data[i].title = "" + data[i].title;
		data[i].artist = "" + data[i].artist;
	}//for i
	//});

	//Crossfilter
	var cf = crossfilter(data);
	// Create a dimension by political party
    var cfYear = cf.dimension(function(d) { return +d.year; });
		
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
	
	//Create the legend
	createLegend();

	//Change the year when moving the slider
	updateDots = function (chosenYear) {
		
		//Filter the chosen year from the total dataset
		var yearData = cfYear.filterExact(+chosenYear);

		//Update the search box with only the names available in the chosen year
		updateSearchbox(yearData.top(Infinity));
		
		//Reset the heights
		years.forEach(function(value, index) {
			years[index].number = 1;
		});
	
		//DATA JOIN
		//Join new data with old elements, if any.
		var dots = dotContainer.selectAll(".dot")
					.data(yearData
							.top(Infinity)
							.sort(function(a, b) {return a.position - b.position}) 
							, function(d) { return d.position; });
		
		//ENTER
		dots.enter().append("rect")
			  .attr("class", "dot")
			  .attr("width", rectWidth)
			  .attr("height", rectHeight)
			  .attr("rx", rectCorner)
			  .attr("ry", rectCorner)
			  .style("fill", function(d) { return color(d.position); })
			  .on("mouseover", showTooltip)
			  .on("mouseout", hideTooltip)
			  .attr("x", function(d) { return (x(d.release) - rectWidth/2); })
			  .attr("y", function(d) {return y(0);})
			  .style("opacity",0);

		//EXIT
		dots.exit()
			.transition().duration(500)
			.attr("y", function(d) { return y(0); })
			.style("opacity",0)
			.remove();
			
		//UPDATE
		//First drop all rects to the zero y-axis and make them invisible
		//Then set them all to the correct new release year (x-axis)
		//Then let them grow to the right y locations again and make the visible
		dots
			.transition().duration(500)
			.attr("y", function(d) { return y(0); })
			.style("opacity",0)
			.call(endall, function() {
				dots
					.attr("x", function(d) { return (x(d.release) - rectWidth/2); })
					.transition().duration(10).delay(function(d,i) { return i; })
					.attr("y", function(d) { return locateY(d); })
					.style("opacity",1);
			});
			
		//Change year title
		yearTitle.text(chosenYear);
		//Save the current year
		chosenYearOld = chosenYear;
		
	}//function updateDots
	
	//Call first time
	updateDots(chosenYear);
	
});