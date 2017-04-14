function initString(cl, str) {
  var carr = initCarr(cl, str);
  var strCons = (cl.getResolvedClass('Ljava/lang/String;')).getConstructor(null);
  var strObj = new strCons(null);
  strObj['java/lang/String/value'] = carr;
  return strObj;
}

function initCarr(cl, str) {
  var arrClsCons = (cl.getInitializedClass(null, '[C')).getConstructor(null),
    carr = new arrClsCons(null, str.length),
    carrArray = carr.array;

  for (var i = 0; i < str.length; i++) {
    carrArray[i] = str.charCodeAt(i);
  }
  return carr;
}
// This entire object is exported. Feel free to define private helper functions above it.
registerNatives({
  'sun/applet/Shim': {

    'getDocumentURL()Ljava/lang/String;': function(thread) {
    	return initString(thread.getBsCl(), document.URL);
    }
  }
});
