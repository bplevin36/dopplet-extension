
console.log("Finding applets...");
var elements = document.getElementsByTagName("applet");
var applets = [];
for(var i=0; i<elements.length; i++){
	applets.push(elements[i].attributes['code'].nodeValue);
}
var port = chrome.runtime.connect({name: "applets"});
port.postMessage(applets);

let toReplace = elements[0];
let javaCode = applets[0];
let canvas = document.createElement('canvas');
canvas.setAttribute('data-code', javaCode.endsWith('.class')?javaCode.slice(0,-6):javaCode);
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

// add browserfs
let browserfsjs = document.createElement('script');
browserfsjs.setAttribute('src', chrome.runtime.getURL('res/browserfs.js'));
browserfsjs.onload = function(){
	// initialize browserfs
	let initfs = document.createElement('script');
	initfs.innerHTML = `
	// Wrap in a closure; don't pollute the global namespace.
    (function() {
      var mfs = new BrowserFS.FileSystem.MountableFileSystem(),
        fs = BrowserFS.BFSRequire('fs');
      BrowserFS.initialize(mfs);
      // Temporary storage.
      mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
      // 10MB of writable storage
      // Use BrowserFS's IndexedDB file system for more storage.
      mfs.mount('/home', new BrowserFS.FileSystem.LocalStorage());
      // The first argument is the filename of the listings file
      // The second argument is the relative URL to the folder containing the listings file
      // and the data it indexes.
      // In this example, the listings file and DoppioJVM's data is at
      // <thiswebpage>/doppio/listings.json
      mfs.mount('/sys', new BrowserFS.FileSystem.XmlHttpRequest('listings.json', 
      	'${chrome.runtime.getURL('res/')}' ) );

      // mount file system for class files
      mfs.mount('/page', new BrowserFS.FileSystem.XmlHttpRequest('listings.json', 'http://127.0.0.1:3000'));
    })();
    `;
	document.head.appendChild(initfs);


	// add doppio source
	let doppiojs = document.createElement('script');
	doppiojs.setAttribute('src', chrome.runtime.getURL('res/doppio.js'));
	doppiojs.onload = function(){
		let startJVM = document.createElement('script');
		startJVM.innerHTML = String.raw`
		new Doppio.VM.JVM({
			doppioHomePath: '/sys',

			classpath: ['/page']
		}, function(err, jvm){
			jvm.runClass('${canvas.getAttribute('data-code')}', ['arg1'], function(exitCode){
				if(exitCode == 0){
					console.log("succesful jvm termination");
				} else {
					console.log("error during jvm execution");
				}
			});
		});
		// pipe stdout to console
		var process = BrowserFS.BFSRequire('process');
    	process.initializeTTYs();
    	var stdoutBuff = '';
    	process.stdout.on('data', function(data){
      		stdoutBuff += data.toString();
      		var newlineIdx;
      		while((newlineIdx = stdoutBuff.indexOf('\n')) > -1){
        		console.log(stdoutBuff.slice(0,newlineIdx));
        		stdoutBuff = stdoutBuff.slice(newlineIdx+1);
      		}
    	});
		`;
		document.head.appendChild(startJVM);
	};
	document.head.appendChild(doppiojs);
};
document.head.appendChild(browserfsjs);


// test square draw
let ctx = canvas.getContext("2d");
ctx.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
