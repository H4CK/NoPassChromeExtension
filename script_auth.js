$(document).ready(function(){
	
$('#submit1').click(function(){
	console.log("Called");
 //window.location.href="new.html";
    //chrome.browserAction.setPopup({popup: "new.html"});
	var email=$(email1).val();
	//generator
	var publickey="12345";
	var privatekey="12345";
	console.log("Email "+email);
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    url=tabs[0].url;
    console.log("URL "+url);
     var m = url.match(/^http:\/\/[^/]+/);
    url= m ? m[0] : null;
    console.log("Host "+url);
});
	// insert email,private,URL  in local DB
    //var pathname = window.location.pathname;
 	
	//send email,public, URL to server
	});
	
	
	
	
		
	
	
	});