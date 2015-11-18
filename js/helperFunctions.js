// Helper functions

window.onerror = function() {
    //location.reload();
}

//Check for IE
function detectIE() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
		var trident = ua.indexOf('Trident/');
		
		if (msie > 0 || trident > 0) { 
			return true;
		} else {
			return false;
		}//else
}//detectIE

//Calculate height of each rectangle
function locateY(d) {

	var yearLoc = d.release - startYear;
	var topping = years[yearLoc].number;
	years[yearLoc].number += 1;
	
	return y(topping);	
}// function locateY

//Taken from https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
//Calls a function only after the total transition ends
function endall(transition, callback) { 
	var n = 0; 
	transition 
		.each(function() { ++n; }) 
		.each("end", function() { if (!--n) callback.apply(this, arguments); }); 
}

//Taken from http://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates
//Remove duplicates
function ArrNoDupe(a) {
	var temp = {};
	for (var i = 0; i < a.length; i++)
		temp[a[i]] = true;
	var r = [];
	for (var k in temp)
		r.push(k);
	return r;
}//ArrNoDupe

//Update the search box with only the names available in the chosen year
function updateSearchbox(data) {
		//Remove previous box
		$('.combobox-container').remove();

		//Remove all the previous options
		var select = document.getElementById("searchBox"); 
		select.options.length = 0;
		select.options[0] = new Option("Artist Name...", "", true, false)
		
		//Create options - all the artists in the current year
		var options = data.map(function(d) { return d.artist; });
		options = ArrNoDupe(options); //remove duplicates
		options = options.sort(); //sort
		
		//Put new options into select box
		for(var i = 0; i < options.length; i++) {
			var opt = options[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
		}

		//Create search combo box
		$('.combobox').combobox();
		
}//function updateSearchbox

//What to do when searched for artist
function searchArtist(artist) {
	//find the artist
	selectedArtist = artist;
	
	if (selectedArtist == "") {
		dotContainer.selectAll(".dot")
			.filter(function(d) { return d.year == chosenYear;})
			.attr("opacity",1);
			
		inSearch = false;
	
	} else {
		dotContainer.selectAll(".dot")
			.filter(function(d) { return d.year == chosenYear && d.artist.toLowerCase() == selectedArtist.toLowerCase(); })
			.attr("opacity",1);
			
		dotContainer.selectAll(".dot")
			.filter(function(d) { return d.year == chosenYear && d.artist.toLowerCase() != selectedArtist.toLowerCase(); })
			.attr("opacity",0.2);
		
		inSearch = true;
	}//else
}// searchArtist

//Also fire search on Enter in search box	  
$("#txtSearch").keyup(function(event){
	if(event.keyCode == 13){
		$("#btnSearch").click();
	}
});

//Taken from http://stackoverflow.com/questions/6258521/clear-icon-inside-input-text
//Reset search box 'x'
$(document).on('input', '#txtSearch', function() {
		$(this)[tog(this.value)]('x');
	}).on('mousemove', '.x', function(e) {
		$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');   
	}).on('click', '.onX', function(){
		$(this).removeClass('x onX').val('').change();
	
		dotContainer.selectAll(".dot")
			.filter(function(d) { return d.year == chosenYear;})
			.attr("opacity",1);	
		inSearch = false;
	});

function tog(v){return v?'addClass':'removeClass';} 