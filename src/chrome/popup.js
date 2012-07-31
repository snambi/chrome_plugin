

// connect to the content script
var port=null;
var tabId=null;

var getScriptsCmd = { 'command' : 'get_scripts' };

/**
   Setup : 
   [1] get the current tab, 
   [2] create a port, 
   [3] add port-listeners and 
   [4] associate an event with the 'div's.
 */
chrome.windows.getCurrent(function(win) { 

	// find the tab.id of current tab
        chrome.tabs.query( {'windowId': win.id, 'active': true}, function(tabArray){ 
            if( tabArray instanceof Array ){
                alert("tabs " + tabArray.length  + " " + tabArray[0].id );
                tabId = tabArray[0].id;
            }

	    // create a port
     	    if( port == null){
		var name = { "name" : "swap"};
		alert("connecting to tab : " + tabId);
		port = chrome.tabs.connect( tabId, name);
		port.postMessage( getScriptsCmd);
	    
		// handle incoming messages
		port.onMessage.addListener(function(msg){
		    if( msg != null ){
			    alert(msg);
		    }
		});
     	    }


	    // add an 'click' event listener for 'div' elements
	    document.addEventListener( 'DOMContentLoaded', function(){
		var divs = document.getElementsByTagName('div');
		for( var i=0; i< divs.length ; i++ ){
		   divs[i].addEventListener('click', click );
		}
	    });
        }); 
});

/* function to send a message to the 'content' script port */
function click( e ){
	chrome.tabs.getSelected(null, function( tab ){
		var cmd = { "command" : "get_scripts" };
		if( port != null ){
			port.postMessage( cmd );
		}else{
			alert("connection doesn't exist");
		}
	});
}



