

// connect to the content script
var port=null;
var tabId=null;

chrome.windows.getCurrent(function(win) { 
        chrome.tabs.query( {'windowId': win.id, 'active': true}, function(tabArray){ 
            if( tabArray instanceof Array ){
                alert("tabs " + tabArray.length  + " " + tabArray[0].id );
                tabId = tabArray[0].id;
            }
        }); 
});

chrome.tabs.getSelected( null, function(tab){
        alert( "tab [" + tab.id + "]" );
     if( port == null){
        var name = { "name" : "swap"};
        port = chrome.tabs.connect( tab.id, name);
     }
});

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

document.addEventListener( 'DOMContentLoaded', function(){
	var divs = document.getElementsByTagName('div');
	for( var i=0; i< divs.length ; i++ ){
		divs[i].addEventListener('click', click );
	}
});


