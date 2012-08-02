
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
           console.log( "request : " + JSON.stringify(request) ); 
           sendResponse( {"messag" : "hello there"});
});
