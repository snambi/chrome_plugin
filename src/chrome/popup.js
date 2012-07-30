
function click( e ){
	//chrome.tabs.executeScript( null, {file: "swap.js" } );
	chrome.tabs.getSelected(null, function( tab ){
		//alert("tab ["+ tab.id + "]");
		var cmd = { "command" : "get_scripts" };
		chrome.tabs.sendMessage( tab.id, cmd , function( response ){
			alert("message received");
			alert(response );
		});
	});
	//window.close();
}

document.addEventListener( 'DOMContentLoaded', function(){
	var divs = document.getElementsByTagName('div');
	for( var i=0; i< divs.length ; i++ ){
		divs[i].addEventListener('click', click );
	}
});

function getScripts(){
	alert('hello');
}


