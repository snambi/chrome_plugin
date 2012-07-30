function getScripts(){
	var scripts = document.getElementsByTagName('script');
	var details="";
	for( var i=0; i<scripts.length ; i++ ){
		details += "[" + i + "] " + scripts[i].type + " " + scripts[i].src + "  \n";
		//alert( 'script : ' + scripts[i].type );
	}

	return scripts;
}


chrome.extension.onMessage.addListener( function( request, sender, sendResponse ){
	//alert( sender.tab ? "from content script:" + sender.tab.url : "from extension");
	if( request != null  ){
		if( request.command == "get_scripts" ){
			alert("get scripts");
			var scripts = getScripts();
			alert(scripts);
			if( sendResponse != null ){
				alert( sendResponse );
			}
			sendResponse( { data: "found"} );
		}
	}
});



