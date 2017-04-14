// background.js
// Event page to install declarative rules for matching on applets

// Content script injection on page action click
chrome.pageAction.onClicked.addListener(function(tab){
	chrome.tabs.executeScript(tab.id, {file: "src/find_applet.js"});
});

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "applets");
	var dest = port.sender.tab.id;
	port.onMessage.addListener(function(msg) {
		var num = new String(msg.length);
		console.log(num + " applets found on this page");
	});
});

var appletRule = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			css: ["applet"]
		}),
		new chrome.declarativeContent.PageStateMatcher({
			css: ["object"]
		})
	],
	actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(function(details){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([appletRule]);
	});
});
