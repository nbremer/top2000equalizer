////////////////////////////////////////////////////////////
///////////////// Mobile vs Desktop ////////////////////////
////////////////////////////////////////////////////////////

//Check for Firefox
var is_Firefox = /firefox/i.test(navigator.userAgent);
var is_IE = detectIE();

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
	fileName = (is_IE | is_Firefox ? "top2000lijst2015.csv" : "top2000lijst2015.csv"); //IE & Firefox cannot read Unicode saved files
} else {
	fileName = (is_IE | is_Firefox ? "top2000lijst.csv" : "top2000lijst.csv");
}//else
	
////////////////////////////////////////////////////////////
////////////////// Helper Functions ////////////////////////
////////////////////////////////////////////////////////////

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

	if (selectedArtist === "") {
		dotContainer.selectAll(".dot")
			.style("opacity",1);
			
		inSearch = false;
	} else {
		dotContainer.selectAll(".dot")
			.style("opacity", function(d) {
				return d.artist.toLowerCase() == selectedArtist.toLowerCase() ? 1 : 0.2; 
			});
			
		inSearch = true;
	}//else
		
}// searchArtist