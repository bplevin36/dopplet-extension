
console.log("Finding applets...");
var elements = document.getElementsByTagName("applet");
var applets = [];
for(var i=0; i<elements.length; i++){
	applets.push(elements[i].attributes['code'].nodeValue);
}
var port = chrome.runtime.connect({name: "applets"});
port.postMessage(applets);

let toReplace = elements[0];
let canvas = document.createElement('canvas');
canvas.id = 'appletReplacement';
canvas.style = "border:1px solid #000000;";
if (toReplace.attributes['height']){
	canvas.height = toReplace.attributes['height'].value;
}
if (toReplace.attributes['width']){
	canvas.width = toReplace.attributes['width'].value;
}
//swap in canvas and fill with test
// TODO scrape out params element under applet
let parent = toReplace.parentNode;
parent.replaceChild(canvas, toReplace);
let firstSibling = parent.firstChild;

// add browserfs
let browserfsjs = document.createElement('script');
browserfsjs.setAttribute('src', chrome.runtime.getURL('res/browserfs.js'));
browserfsjs.onload = function(){
	// initialize browserfs
	let initfs = document.createElement('script');
	initfs.setAttribute('src', chrome.runtime.getURL('res/init_fs.js'));
	document.head.appendChild(initfs);
};
document.head.appendChild(browserfsjs);

/*
// add doppio source
let doppiojs = document.createElement('script');
doppiojs.setAttribute('src', chrome.runtime.getURL('res/doppio.js'));
parent.insertBefore(doppiojs, firstSibling);
*/
// test square draw
let ctx = canvas.getContext("2d");
ctx.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
