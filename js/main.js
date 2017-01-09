/*
Ideja:
Naslov: Vizualizacija uspešnosti evolucijskega računanja v programskem jeziku java script

Input:
algID; algName;[algParams];problemID; problemName;problemDim;[problemParams]
{id; generation; [parentids]; timestamp; eval; fitness; [x]}*

GUI:
Speed (10xslow), load, play
2dGraph [x_a,x_b] ali [fit, x_a]
Več grafov;
*/
var GLOBAL_ARGS_NUM = 7; // Number of arguments in the first line (global)

var exampleInput  = ''+
'1;ime1;["param1","param2","param3"];1;problem1;3;["param1","param2"];'+
'{1;1;-1,-1;00000;1;5;[3,3,3]}'+
'{2;1;-1,-1;00000;1;3;[2,3,1]}'+
'{3;1;-1,-1;00000;1;4;[3,1,5]}'+
'{4;1;-1,-1;00000;1;2;[3,2,1]}'+
'{5;2;1,3;00001;1;5;[3,3,3]}'+
'{6;2;2,4;00001;1;3;[2,3,1]}';

/*
* Loops over all items of a given string/array and triggers callback if item matches value
* @param string/array 	str 		String or array over which to loop
* @param string/integer	val 		Value to be compared with looped items
* @param function 		callback 	Callback function, triggered when item is matched with val
*/
function indexOfAll(str, val, callback) {
	var indexes = [], i;
	var prev = 0; // Last found index
	var count = 0; // Counter of matched items
	for(i = 0; i < str.length; i++){
		if (str[i] === val){
			var stop = callback.call(str, i, prev, count);
			// Check if callback returned true, breaks loop
			if(true === stop)
				break;
			prev = i;
			count++;
		}
	}
}
/*
* Parses entire input text (document)
* @param string	input 	String input
*/
function parseInput(input){
	var rtrn = {};
	indexOfAll(input, ';', function(index, prev, count){
		prev = prev > 0 ? prev + 1 : prev;
		var item =  this.substring(prev, index);
		if('' === item) {
			return false;
		}
		if(count < GLOBAL_ARGS_NUM) {
			parseArgs(rtrn, item, count);
		} else {
			parseLine(rtrn, item);
		}
		//console.log(index + ' ' + prev);
	});

	return rtrn;
}

/*
* Parses global arguments:
* algID; algName;[algParams];problemID; problemName;problemDim;[problemParams]
* @param object 	obj 	Object that stores the parsed values
* @param string		arg 	(one) argument value
* @param integer	argNum 	argument's number
*/
function parseArgs(obj, arg, argNum) {

	switch(argNum){
		case 0: { // algID
			break;
		}
		case 1: { // algName
			break;
		}
		case 2: { // [algParams]
			arg = JSON.parse(arg);
			break;
		}
		case 3: { // problemID
			break;
		}
		case 4: { // problemName
			break;
		}
		case 5: { // problemDim
			break;
		}
		case 6: { // [problemParams]
			arg = JSON.parse(arg);
			break;
		}
	}
	return obj;
}


/*
* Parses all the other lines of input
* {id; generation; [parentids]; timestamp; eval; fitness; [x]}
* @param object 	obj 	Object that stores the parsed values
* @param string 	line 	String of one line of the input
*/
function parseLine(obj, line) {

}



function onFileChanged(evt){
 	//Retrieve all the files from the FileList object
 	var files = evt.target.files;

 	if (files) {
 		for (var i = 0, f; f = files[i]; i++) {
 			var r = new FileReader();
 			r.onload = (function (f) {
 				return function (e) {
 					var contents = e.target.result;
 					parseInput(contents);
 				};
 			})(f);
 			r.readAsText(f);
 		}
 	} else {
 		alert("Failed to load files");
 	}
 }

 function drawGraph(container) {
 	var c = document.getElementById("myCanvas");
 	var ctx = c.getContext("2d");
 	ctx.moveTo(0,0);
 	ctx.lineTo(200,100);
 	ctx.stroke();

 	var c = document.getElementById("myCanvas");
 	var ctx = c.getContext("2d");
 	ctx.beginPath();
 	ctx.arc(95,50,40,0,2*Math.PI);
 	ctx.stroke();
 }

 $(document).ready(function(){
 	$('#file').on('change', onFileChanged);
 	drawGraph();

 	parseInput(exampleInput);
 });
