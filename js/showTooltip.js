//Show the tooltip on hover
function showTooltip(d) {

	//Current element	
	var el = d3.select(this);
	
	if (inSearch == true) {
		if (d.artist.toLowerCase() != selectedArtist.toLowerCase()) return;	
	} else {
		//Save the current element
		var chosen = d;
		//Reduce opacity of all other elements
		svg.selectAll(".dot")
			.filter(function(d) { return d.year == chosenYear && d != chosen;})
			.style("fill-opacity", 0.2);		
	}// else
	
	//Set first location of tooltip and change opacity
	var xpos = (+el.attr('x') + rectWidth/2 + padding + xOffset + offsets.left);
	var ypos = (+el.attr('y') + margin.top - rectHeight*3 + offsets.top);
	 
	//Position the tooltip
	d3.select("#tooltip")
		.style('top',ypos+"px")
		.style('left',xpos+"px")
		.style('opacity',1);	

	//Change the texts inside the tooltip
	d3.select("#tooltip .tooltip-band").text(d.artist);
	d3.select("#tooltip-year").html(d.release);
	d3.select("#tooltip-title").html(d.title);
	d3.select("#tooltip-place").html("Position in Top 2000: " + d.position);
}//showTooltip	

function hideTooltip(d) {

	//Only reset opacity of no search is being performed
	if (inSearch == false) {
		//All opacities back to 1
		svg.selectAll(".dot")
			.filter(function(d) { return d.year == chosenYear; })
			.style("fill-opacity", 1);
	}//if
	
	//Hide tooltip
	d3.select("#tooltip")
		.style('opacity',0)
		.style('top',0+"px")
		.style('left',0+"px");
}//hideTooltip