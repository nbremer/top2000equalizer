//Show the tooltip on hover
function showTooltip(d) {
	
	if (inSearch == true) {
		//Don't do anything if the search is active and the user doesn't mouse over the selected artist
		if (d.artist.toLowerCase() !== selectedArtist.toLowerCase()) return;	
	} else {
		//Save the current element
		var chosen = d;
		//Reduce opacity of all other elements
		svg.selectAll(".dot")
			.style("opacity", function(d) { return d.position === chosen.position ? 1 : 0.2; });		
	}// else
	
	//Position tooltip
	var Loc = this.getBoundingClientRect();
	//Set first location of tooltip and change opacity
	var xpos = Loc.left + rectWidth/2;
	var ypos = Loc.top - rectHeight*3;
	 
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
			.style("opacity", 1);
	}//if
	
	//Hide tooltip
	d3.select("#tooltip")
		.style('opacity',0)
		.style('top',0+"px")
		.style('left',0+"px");
}//hideTooltip
