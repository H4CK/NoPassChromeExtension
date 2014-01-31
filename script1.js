$(document).ready(function(){

$(back1).click(function(){
 window.location.href="popup.html";
    chrome.browserAction.setPopup({popup: "popup.html"});
	
	});

	});