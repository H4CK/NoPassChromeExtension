var db;

function indexedDBOk() {
	return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() {

	//No support? Go in the corner and pout.
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open("idarticle_accounts4",1);

	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;

		if(!thisDB.objectStoreNames.contains("accounts")) {
			thisDB.createObjectStore("accounts", {autoIncrement:true});
		}
	}

	openRequest.onsuccess = function(e) {
		db = e.target.result;

		//Listen for add clicks
		document.querySelector("#submit1").addEventListener("click", addAccount, false);

		//Listen for get clicks
		// document.querySelector("#getButton").addEventListener("click", getrecord, false);

		//Listen for get clicks
		// document.querySelector("#getAllButton").addEventListener("click", getaccounts, false);

	}	

	openRequest.onerror = function(e) {
		//Do something for the error
	}


},false);


function addAccount(e) {
	var url;
	var email=$(email1).val();
			//generator
			publicKey="12345";
			privateKey="12345";
			console.log("Email "+email);
			chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
				url=tabs[0].url;
				console.log("URL "+url);
				var m = url.match(/^http:\/\/[^/]+/);
				url= m ? m[0] : null;
				console.log("Host "+url);
			});
	
	console.log("About to add "+name+"/"+email);

	//Get a transaction
	//default for OS list is all, default for type is read
	var transaction = db.transaction(["accounts"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("accounts");

	//Define a record
	var record = {
				'email':email,
				'url':url,
				'publicKey':publicKey
			}

	//Perform the add
	var request = store.add(record);

	request.onerror = function(e) {
		console.log("Error",e.target.error.name);
		//some type of error handler
	}

	request.onsuccess = function(e) {
		console.log("Woot! Did it");
	}
}

function getrecord(e) {
	var key = document.querySelector("#key").value;
	if(key === "" || isNaN(key)) return;

	var transaction = db.transaction(["accounts"],"readonly");
	var store = transaction.objectStore("accounts");

	var request = store.get(Number(key));

	request.onsuccess = function(e) {

		var result = e.target.result;
		console.dir(result);
		if(result) {
			var s = "<h2>Key "+key+"</h2><p>";
			for(var field in result) {
				s+= field+"="+result[field]+"<br/>";
			}
			document.querySelector("#status").innerHTML = s;
		} else {
			document.querySelector("#status").innerHTML = "<h2>No match</h2>";
		}	
	}	


}

function getaccounts(e) {

	var s = "";

	db.transaction(["accounts"], "readonly").objectStore("accounts").openCursor().onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor) {
			s += "<h2>Key "+cursor.key+"</h2><p>";
			for(var field in cursor.value) {
				s+= field+"="+cursor.value[field]+"<br/>";
			}
			s+="</p>";
			cursor.continue();
		}
		document.querySelector("#status2").innerHTML = s;
	}
}