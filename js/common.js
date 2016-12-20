/* Popup */
/*
Example:
popup.showPopup('<b>hello</b>',[
{
	text:'Test',
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
	$btn.html(obj.text);
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


