function createLegend() {

	////////////////////////////////////////////////////
	//Legend
	////////////////////////////////////////////////////
	
	var legendText = ["1 - 49","50 - 99","100 - 499","500 - 999","1000 - 2000"];
	
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
		  .data(hexColors)
		.enter().append("g")
		  .attr("class", "legend")
		  .attr("transform", function(d, i) { return "translate(0," + (20 + i * 20) + ")"; });

	legend.append("rect")
		  .attr("x", 0)
		  .attr("y", -rectHeight*2)
		  .attr("width", rectWidth*2)
		  .attr("height", rectHeight*2)
		  .attr("rx", rectCorner*2)
		  .attr("ry", rectCorner*2)
		  .style("fill", function(d,i) {return d;});

	legend.append("text")
		  .attr("x", -6)
		  .style("text-anchor", "end")
		  .text(function(d,i) { return legendText[i]; });

}//createLegend