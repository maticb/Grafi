/* Popup */
/*
Example:
popup.showPopup('<b>hello</b>',[
{
	content:'Test',
	action(){
		this.hidePopup();
	}
}
]);
*/
popup = {};

popup.renderPopupButton = function(obj, $appendTo){
	var self = this;
	var $btn = $('<button />')
	$btn.html(obj.content);
	$btn.on('click', function(){
		obj.action.call(self);
	});

	$appendTo.append($btn);
}

popup.showPopup = function(content, buttons){
	var $popup = $('#popup');
	$popup.find('.popup-content').html(content);
	$btns = $popup.find('.popup-buttons');
	for(var i in buttons)
		this.renderPopupButton(buttons[i], $btns);

	$popup.show();
}

popup.hidePopup = function(){
	var $popup = $('#popup');
	$popup.find('.popup-content').html('');
	$popup.hide();
}


/*
* Loops over all items of a given string/array and triggers callback if item matches value
* @param string/array 	str 		String or array over which to loop
* @param string/integer	val 		Value to be compared with looped items
* @param function 		callback 	Callback function, triggered when item is matched with val
*/
function indexOfAll(str, val, callback) {
	// Compare value function, in case given value is array
	function compareVal(val1) {
		if('object' === typeof val){ // If val is array
			for( var i in val) {
				if(val[i] === val1)
					return true;
			}
			return false;
		} else {
			return val === val1;
		}
	}
	var indexes = [], i;
	var prev = 0; // Last found index
	var count = 0; // Counter of matched items
	for(i = 0; i < str.length; i++){
		if (compareVal(str[i])){
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
* Universal function that parses array from argument string
* @param string 	input 		String (JSON) of the given argument
*/
function parseArray(input){
	return JSON.parse(input);
}



