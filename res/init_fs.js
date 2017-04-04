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
                                chrome.runtime.getURL('res/')));
    })();