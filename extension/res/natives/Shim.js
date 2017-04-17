
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
  'Shim': {
    'appletResize(II)V': function(thread, javaThis, width, height){

    },
    'getDocumentBase0()Ljava/lang/String;': function(thread, javaThis) {
    	return initString(thread.getBsCl(), document.URL);
    },
    'getParameter(Ljava/lang/String;)Ljava/lang/String;': function(thread, javaThis, paramName){
      let canvas = document.getElementById(javaThis['Shim/canvasId'].toString());
      let param = canvas.getAttribute(paramName.toString());
      if(param)
        return initString(thread.getBsCl(), param);
      let params = canvas.getElementsByTagName('param');
      for(let i=0; i<params.length; i++){
        let name = params[i].getAttribute('name');
        if(name && name === paramName.toString()){
          let val = params[i].getAttribute('value');
          if(val)
            return initString(thread.getBsCl(), val);
        }
      }
      return null;
    }
  }
});

//# sourceURL=chrome-extension://haecjomoehmjbllenidmmohecalbajbe/res/natives/Shim.js
