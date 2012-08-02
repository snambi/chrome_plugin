function getScripts(){
	var scripts = document.getElementsByTagName('script');
	var details="";
	for( var i=0; i<scripts.length ; i++ ){
		details += "[" + i + "] " + scripts[i].type + " " + scripts[i].src + "  \n";
		//alert( 'script : ' + scripts[i].type );
	}

	return scripts;
}

var port = chrome.extension.connect({"name":"swap"});
port.onMessage.addListener( function(msg){
        console.log("received :" + msg );
} );

chrome.extension.onConnect.addListener(function( incomingPort ){
        incomingPort.onMessage.addListener(function( msg ){
            console.log("CS [" + JSON.stringify(msg) + "]" );

            if( msg.command === 'get_scripts' ){
                var scripts = getScripts();
            }

            var scrs = { 'scripts' : 'name' };
            console.log("msg sent: " + scrs);
            var result = port.postMessage( scrs );

            console.log( "result : " + result );

        });
});

/*
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
*/


