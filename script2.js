$(document).ready(function(){

$(back2).click(function(){
 window.location.href="popup.html";
    chrome.browserAction.setPopup({popup: "popup.html"});
	
	});

	});