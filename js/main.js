/*
Ideja:
Naslov: Vizualizacija uspešnosti evolucijskega računanja v programskem jeziku java script

Input:
algID; algName;[algParams];problemID; problemName;problemDim;[problemParams]
{id; [parentids]; timestamp; eval; generation; fitness; [x]}*

GUI:
Speed (10xslow), load, play
2dGraph [x_a,x_b] ali [fit, x_a]
Več grafov;
*/
function renderPopupButton(obj, $appendTo){
	var $btn = $('<button />')
	$btn.html(obj.text);
	$btn.on('click', obj.action);

	$appendTo.append($btn);
}

function showPopup(content, buttons){
	var $popup = $('#popup');
	$popup.find('.popup-content').html(content);
	$btns = $popup.find('.popup-buttons');
	for(var i in buttons)
		renderPopupButton(buttons[i], $btns);

	$popup.show();
}

function hidePopup(){
	var $popup = $('#popup');
	$popup.find('.popup-content').html('');
	$popup.hide();
}

$(document).ready(function(){
	showPopup('<b>hello</b>',[{text:'Test',action(){alert('hi');}}]);
});