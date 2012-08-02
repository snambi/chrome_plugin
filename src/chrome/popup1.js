
// global variables
var cmd_get_scripts = { 'command' : 'get_scripts' };

/**
 *
 */
function process_scripts( scripts ){
    console.log("Scripts : " + JSON.stringify(scripts) );
}

/**
 * click(e)
 *
 * when user 'clicks' the button, send a 'command' to the 'content script', i.e., tab.
 */
function click(e){
    chrome.tabs.getSelected(null, function( tab ){
        chrome.tabs.sendRequest(tab.id, cmd_get_scripts, function(response){
                console.log(JSON.stringify(response) );
            } );
    } );
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


