
console.log("executing swap2.js");

// create connection to the 'swapJS' plugin
var port = chrome.extension.connect({name: "swapJS"});

// add a listener to 'nullify' the port, if there is a disconnect
port.onDisconnect.addListener(function(){
        port = null;
});

// send a message to the plugin
if( port != null ){
    port.postMessage({message: "Hello World"});
}

