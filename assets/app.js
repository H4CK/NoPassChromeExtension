

function readFile (fileName) {
// body...
}

function writeFile (fileName,contents) {
// body...
}

$(document).ready(function(){
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log("YESS")
	// Great success! All the File APIs are supported.
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
});