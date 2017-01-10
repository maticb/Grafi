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
'{1;1;[-1,-1];00000;1;5;[3,3,3]}'+
'{2;1;[-1,-1];00000;1;3;[2,3,1]}'+
'{3;1;[-1,-1];00000;1;4;[3,1,5]}'+
'{4;1;[-1,-1];00000;1;2;[3,2,1]}'+
'{5;2;[1,3];00001;1;5;[3,3,3]}'+
'{6;2;[2,4];00001;1;3;[2,3,1]}';

/*
* Parses entire input text (document)
* @param string	input 	String input
*/
function parseInput(input){
	var rtrn = {};
	rtrn.steps = []; // Algorithm steps will be stored in an array
	// Parsing arguments
	indexOfAll(input, ';', function(index, prev, count){
		prev = prev > 0 ? prev + 1 : prev; // If previous index is above 0, add 1 (because that index is the ";")
		var item =  this.substring(prev, index);
		if('' === item) {
			return false;
		}
		if(count < GLOBAL_ARGS_NUM) {
			parseArgs(rtrn, item, count);
		} else {
			// End loop
			return true;
		}
		//console.log(index + ' ' + prev);
	});
	//Parse the remaining lines
	indexOfAll(input, ['{','}'], function(index, prev, count){

		if(0 === prev) //If we found the first "{" pass
			return false;
		prev += 1; // Add 1  to prev (because that index is the "{" or "}")
		var item =  this.substring(prev, index);
		if('' === item) {
			return false;
		}
		parseLine(rtrn, item);
	});
	console.log(rtrn);
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
			obj.algId = parseInt(arg);
			break;
		}
		case 1: { // algName
			obj.algName =  arg;
			break;
		}
		case 2: { // [algParams]
			obj.algParams = parseArray(arg);
			break;
		}
		case 3: { // problemID
			obj.problemId = parseInt(arg);
			break;
		}
		case 4: { // problemName
			obj.problemName =  arg;
			break;
		}
		case 5: { // problemDim
			obj.problemDim = parseInt(arg);
			break;
		}
		case 6: { // [problemParams]
			obj.problemParams = parseArray(arg);
			break;
		}
	}
	return obj;
}

/*
* Parses argument via it's number inside line
* @param string/array 	arg 	argument value
* @param integer 		argNum 	argument's number
*/
function parseLineArg(obj, arg, argNum) {
	switch(argNum) {
		case 0: { // id
			obj.id = parseInt(arg);
			break;
		}
		case 1: { // generation
			obj.generation = parseInt(arg);
			break;
		}
		case 2: { // [parentIds]
			obj.parentIds = parseArray(arg);
			break;
		}
		case 3: { // timestamp
			obj.timestamp = arg;
			break;
		}
		case 4: { // eval
			// TODO: poglej kaj je eval; integer/float?
			obj.eval = arg;
			break;
		}
		case 5: { // fitness
			obj.fitness = parseFloat(arg);
			break;
		}
		case 6: { // [x]
			obj.x = parseArray(arg);
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
	var lineObj = {};
	// Check if last char in line is ";", if not add it (to make sure the loop works)
	if(line[line.length -1] !== ';'){
		line += ';';
	}
	indexOfAll(line, ';', function(index, prev, count){
		prev = prev > 0 ? prev + 1 : prev; // If previous index is above 0, add 1 (because that index is the ";")
		var item =  this.substring(prev, index);
		if('' === item) {
			return false;
		}
		parseLineArg(lineObj, item, count);
	});
	obj.steps.push(lineObj);
}



function onFileChanged(evt) {
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
