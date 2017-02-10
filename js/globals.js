// Static globals
var GLOBAL_ARGS_NUM = 7; // Number of arguments in the first line (global)

// Default values
var GLOBAL_DEFAULT_CANVAS_SETTING = {
	id: -1,
	canvas: undefined,
	ctx: undefined,
	width: 300,
	height: 300,
	xTitle: 'X',
	yTitle: 'Y',
};

// Non-static globals
var GLOBAL_ANIMATION_DATA = {}; // Parsed animation data
var GLOBAL_CANVAS_ARR = []; // Array of canvases

// Playback
var GLOBAL_REQUEST_LOOP = undefined; // Request loop
var GLOBAL_IS_LOADED = false; // Boolean that indicates if any data is loaded (so we can start playback)
var GLOBAL_IS_PLAYING = false; // Indicates if animation is playing
var GLOBAL_IS_SETUP = false; // Indicates if canvas and other elements needed have been setup
var GLOBAL_PLAY_STEP = 0;
var GLOBAL_PLAY_GEN = 0;
