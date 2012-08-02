/**
 *global variables
 */
var cmd_get_scripts = { 'command' : 'get_scripts' };


/**
 * setup listener to accept incoming connections and process messages.
 */
chrome.extension.onConnect.addListener(function(port) {
    
    // add a listener to accept the incoming messages
    port.onMessage.addListener(function(msg) {
        console.log( JSON.stringify(msg) );
    });
});

/**
 * click(e)
 *
 * when user 'clicks' the button, execute the 'content script', i.e., tab.
 */
function click(e){
    chrome.tabs.query({active:true, windowId:-2}, function(tabs){
            var tab = tabs[0];
            chrome.tabs.executeScript(tab.id, {file:'swap2.js'});
    });
}

/**
 * init()
 * 
 * add an event listener to send message to the tab (content script)
 *
 */
function init(){

    var divs = document.getElementsByTagName('div');
    for( var i=0; i< divs.length ; i++ ){
        divs[i].addEventListener( 'click', click );
    }

}


// call the 'init' once the document is loaded
document.addEventListener('DOMContentLoaded', init, false);


