function createLegend() {
	
	//Initiate container around Legend
	var legendContainer = svg.append("g").attr("class","legendContainer")
			  .attr("transform", "translate(" + (width - rectWidth*2.5) + "," + 0 + ")");
	
	var legendTitle = legendContainer.append('text')                                     
			  .attr('x', rectWidth*2.5)              
			  .attr('y', 0)  
			  .attr('class', 'legendTitle')
			  .style("text-anchor", "end")
			  .text("Position in top 2000");
			  
	var legend = legendContainer.selectAll(".legend")
		  .data(hexLocation.map(function(d) { return d.color; }))
		.enter().append("g")
		  .attr("class", "legend")
		  .attr("transform", function(d, i) { return "translate(0," + (20 + i * 20) + ")"; });

	//Invisible rect that captures mouseover events
	legend.append("rect")
		  .attr("x", -70)
		  .attr("y", -10)
		  .attr("width", 70+rectWidth*2)
		  .attr("height", 20)
		  .style("fill", function(d,i) {return d;})
		  .style("opacity", 0)
		  .style("pointer-events", "all")
		  .on("mouseover", legendHover)
		  .on("mouseout", legendHoverOut);
	
	//The colored legend rects
	legend.append("rect")
		  .attr("x", 0)
		  .attr("y", -rectHeight*2)
		  .attr("width", rectWidth*2)
		  .attr("height", rectHeight*2)
		  .attr("rx", rectCorner*2)
		  .attr("ry", rectCorner*2)
		  .style("pointer-events", "none")
		  .style("fill", function(d,i) {return d;});
		  
	//Text left of rects
	legend.append("text")
		  .attr("x", -6)
		  .style("text-anchor", "end")
		  .style("pointer-events", "none")
		  .text(function(d,i) { return hexLocation[i].text; });

}//createLegend

function legendHover(d) {
	
	chosenColor = hexLocation[hexKey[d]];
	//If the search is active only show the rects that fall into the right position but also belong to the artist
	//Otherwise show all rects that fall in between the right position
	if (inSearch == true) {
		svg.selectAll(".dot")
			.style("opacity", function(d) { 
				return $.inArray(d.position, chosenColor.position) >= 0 &
					   d.artist.toLowerCase() === selectedArtist.toLowerCase() ? 1 : 0.2; 
			});	
	} else {
		svg.selectAll(".dot")
			.style("opacity", function(d) { 
				return $.inArray(d.position, chosenColor.position) >= 0 ? 1 : 0.2; 
		});		
	}// else
	
}//legendHover	

function legendHoverOut() {

	//If the search is active, only bring back those rects from the artist
	//Else bring back all rects
	if (inSearch == true) {
		svg.selectAll(".dot")
			.style("opacity", function(d) { 
				return d.artist.toLowerCase() === selectedArtist.toLowerCase() ? 1 : 0.2; 
			});		
	} else {
		svg.selectAll(".dot").style("opacity", 1);		
	}// else
	
}//legendHoverOut	