
console.log("Finding applets...");
var elements = document.getElementsByTagName("applet");
var applets = [];
for(var i=0; i<elements.length; i++){
	applets.push(elements[i].getAttribute('code'));
}
var port = chrome.runtime.connect({name: "applets"});
port.postMessage(applets);

let toReplace = elements[0]
let javaCode = elements[0].getAttribute('code');
let javaName = elements[0].getAttribute('name');
let javaHeight = elements[0].getAttribute('height');
let javaWidth = elements[0].getAttribute('width');
let appletChildren = elements[0].children;
let canvas = document.createElement('canvas');
canvas.setAttribute('data-code', javaCode.endsWith('.class')?javaCode.slice(0,-6):javaCode);
canvas.id = 'applet0';
canvas.className = 'appletReplacement';
canvas.style = "border:1px solid #000000;";
canvas.tabindex = "1";
if(javaName)
  canvas.name = javaName;
if (javaHeight)
	canvas.height = javaHeight;
if (javaWidth)
	canvas.width = javaWidth;
if(appletChildren){
  for(let i=0; i<appletChildren.length; i++){
    canvas.appendChild(appletChildren[i]);
  }
}
// create status box
let statusBox = document.createElement('section');
statusBox.style = "border: 1px solid lightgrey; margin-bottom: 10px";
statusBox.innerHTML = `
<h4 style="margin: 5px 5px;">Status:</h4>
<p class="appletStatus" style="margin: 5px 15px 15px; color: grey; font: 15px arial, sans-serif;">None so far...</p>
`
//swap in canvas and fill with test
// TODO scrape out params element under applet
let parent = toReplace.parentNode;
parent.replaceChild(canvas, toReplace);
parent.insertBefore(statusBox, canvas);

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
			nativeClasspath: ['/sys/natives'],
			classpath: ['/page', '/sys']
		}, function(err, jvm){
			jvm.runClass('Shim', ['arg1'], function(exitCode){
				if(exitCode == 0){
					console.log("jvm terminated");
				} else {
					console.log("error in jvm");
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

    	var stderrBuffer = '';
          process.stderr.on('data', function(data) {
            stderrBuffer += data.toString();
            var newlineIdx;
            while ((newlineIdx = stderrBuffer.indexOf("\n")) > -1) {
              console.log("err: "+stderrBuffer.slice(0, newlineIdx + 1));
              stderrBuffer = stderrBuffer.slice(newlineIdx + 1);
            }
          });
		`;
		document.head.appendChild(startJVM);
	};
	document.head.appendChild(doppiojs);
};
document.head.appendChild(browserfsjs);


// test square draw
//let ctx = canvas.getContext("2d");
//ctx.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
