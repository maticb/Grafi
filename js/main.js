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
'1;ime1;[param1,param2,param3];1;problem1;3;[param1,param2]'+
'{1;1;-1,-1;00000;1;5;[3,3,3]}'+
'{2;1;-1,-1;00000;1;3;[2,3,1]}'+
'{3;1;-1,-1;00000;1;4;[3,1,5]}'+
'{4;1;-1,-1;00000;1;2;[3,2,1]}'+

'{5;2;1,3;00001;1;5;[3,3,3]}'+
'{6;2;2,4;00001;1;3;[2,3,1]}';


function onFileChanged(evt){
 	//Retrieve all the files from the FileList object
 	var files = evt.target.files;

 	if (files) {
 		for (var i = 0, f; f = files[i]; i++) {
 			var r = new FileReader();
 			r.onload = (function (f) {
 				return function (e) {
 					var contents = e.target.result;
 					console.log(contents);
 				};
 			})(f);
 			r.readAsText(f);
 		}
 	} else {
 		alert("Failed to load files");
 	}
 }

 $(document).ready(function(){
 	$('#file').on('change', onFileChanged);
 });
