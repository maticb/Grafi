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
	util.indexOfAll(input, ';', function(index, prev, count){
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
	util.indexOfAll(input, ['{','}'], function(index, prev, count){
		if(0 === prev) //If we found the first "{" pass
			return false;
		prev += 1; // Add 1  to prev (because that index is the "{" or "}")
		var item =  this.substring(prev, index);
		if('' === item) {
			return false;
		}
		parseLine(rtrn, item);
	});
	// If new data is loaded, canvases must be re-set up
	GLOBAL_IS_SETUP = false;
	// Data is loaded
	GLOBAL_IS_LOADED  = true;
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
			obj.algParams = util.parseArray(arg);
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
			obj.problemParams = util.parseArray(arg);
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
			obj.parentIds = util.parseArray(arg);
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
			obj.x = util.parseArray(arg);
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
	util.indexOfAll(line, ';', function(index, prev, count){
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
/*
function drawGraph(data, container) {
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
}*/
/*
var elem = document.getElementById('my-element'),
startTime = null,
endPos = 500, // in pixels
duration = 2000; // in milliseconds

function render(time) {
	if (time === undefined) {
		time = new Date().getTime();
	}
	if (startTime === null) {
		startTime = time;
	}

	elem.style.left = ((time - startTime) / duration * endPos % endPos) + 'px';
}

elem.onclick = function() {
	(function animationLoop(){
		render();
		requestAnimationFrame(animationLoop, elem);
	})();
};*/

/*
* Check if data is loaded
*/
function isLoaded() {
	return true === GLOBAL_IS_LOADED ? true : false;
}

/*
* Check if animation is playing
*/
function isPlaying() {
	return undefined !== GLOBAL_REQUEST_LOOP ? true : false;
}

/*
* Check if canvases are setup
*/
function isSetup() {
	return true === GLOBAL_IS_SETUP ? true : false;
}

/*
* Show a point on a given canvas
* @param integer 	x 			X coordinate
* @param integer 	y 			Y coordinate
* @param object 	ctxObj 		Object with canvas data
* @param integer 	maxX 		Maximum X coordinate of given problem
* @param integer 	maxY 		Maximum Y coordinate of given problem
*/
function renderPoint(x, y = 0, ctxObj, maxX, maxY, prevX = 0, prevY = 0,  drawLine = true, pointColor = '#FF0000', lineColor = '#000000') {
	var ctx = ctxObj.ctx;
	ctx.fillStyle = color;
	var physicalCoords = coordinateTransform(ctxObj, x, y, maxX, maxY);
	ctx.fillRect(physicalCoords.x, physicalCoords.y, 2, 2);

	// Add line from the previously drawn point
	if(true === drawLine) {
		ctx.fillStyle = lineColor;
		var prevCoords = coordinateTransform(ctxObj, prevX, prevY, maxX, maxY);
		ctx.beginPath();
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(physicalCoords.x,physicalCoords.y);
		ctx.stroke();
	}

	//Reset color Back to Black #ACDC
	ctx.fillStyle = '#000000';
}

/*
* Performs all steps within one generation
* @param object 	data 		Data object for the algorithm we are currently animating
* @param integer	genNumber	Generation number
*/
function stepGen(data, genNumber) {
	//TODO: implement
}

/*
* Performs one step of the algorithm
* @param object 	stepData 	Data object for the current step
* @param object 	globals 	Global values for the loaded algorithm
*/
function step(stepData, globals = null) {
	//TODO: implement
}

/*
* Main animation loop
*/
function animationLoop() {
	// If canvases are setup
	if(isSetup()) {
		//TODO: Loop stuff
		console.log('Loop');
	}
	// Request next frame
	GLOBAL_REQUEST_LOOP = window.requestAnimationFrame(animationLoop);
}
/*
* Clears all canvases
*/
function clearCanvases(){
	// Loop in reverse so the splice function works properly!
	// (And also we get numbering from 0 in JS array, unlike what happens when using DELETE)
	for(var i = GLOBAL_CANVAS_ARR.length - 1; i >= 0 ; i-- ) {
		GLOBAL_CANVAS_ARR[i].canvas.remove();
		GLOBAL_CANVAS_ARR.splice(i, 1);
	}
}

/*
* Spawns a canvas with the given id
* @param integer 	id 	Canvas id
*/
function spawnCanvas(id) {
	var container = $('.graphs-container');
	// Clone default settings
	var c = util.clone(GLOBAL_DEFAULT_CANVAS_SETTING);
	c.id = id;
	// Create a canvas element
	c.canvas = $('<canvas/>').height(c.height).width(c.width).attr('height', c.height).attr('width', c.width);
	container.append(c.canvas);
	c.ctx = c.canvas[0].getContext('2d');
	// Push into array
	GLOBAL_CANVAS_ARR.push(c);
}

/*
* Setups the page for playback (proper number of canvas elements)
* @param object 	data 	Data object for the algorithm we are currently animating
*/
function playSetup(data) {
	// Clear any previous canvases
	clearCanvases();
	var dimensions = util.getProp(data, 'problemDim', 'integer');
	var canvasId = 0;
	for(var i = 0; i < dimensions; i += 2) {
		// Spawn canvas for every 2 dimensions
		spawnCanvas(canvasId++);
	}
	GLOBAL_IS_SETUP = true;
}


/*
* Starts playback
*/
function play() {
	if (isLoaded() && !isPlaying()) {
		// Set up the canvases
		playSetup(GLOBAL_ANIMATION_DATA);
		// Play the animation
		animationLoop();
	}
	console.log(GLOBAL_CANVAS_ARR);
}

/*
* Stops playback
*/
function stop() {
	if (isPlaying()) {
		window.cancelAnimationFrame(GLOBAL_REQUEST_LOOP);
		GLOBAL_REQUEST_LOOP = undefined;
	}
}

/*
* Transforms (scales) coordinates from problem dimensions to the physical dimensions on the canvas
* @param object 	ctx 	Canvas context object
* @param integer 	x 		Value of X
* @param integer 	y 		Value of Y
* @param integer 	maxX 	Maximum value of X for given problem
* @param integer 	maxY 	Maximum value of Y for given problem
*/
function coordinateTransform(ctx, x, y, maxX, maxY) {
	var newX =  ctx.width / (maxX / x);
	var newY =  ctx.height / (maxY / y);
	return {x: newX, y: newY};
}

function bindEvents() {
	// TODO: play/stop
	$('.btn-play')
	.off('click')
	.on('click',function() {
		if(isPlaying())
			stop();
		else
			play();
	});
	$('.btn-step')
	.off('click')
	.on('click',function(){
		step();
	});
	$('.btn-step-gen')
	.off('click')
	.on('click',function(){
		stepGen();
	});

}

$(document).ready(function(){
	bindEvents();
	$('#file').on('change', onFileChanged);
	//TMP parse
	GLOBAL_ANIMATION_DATA = parseInput(exampleInput);
	console.log(GLOBAL_ANIMATION_DATA);
	//TMP
	play();
});
