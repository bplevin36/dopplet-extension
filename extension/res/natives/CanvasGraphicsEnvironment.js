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

registerNatives({
  'CanvasGraphicsEnvironment': {
    'getCanvases()[Ljava/lang/String;': function(thread, javaThis){
      let canvases = document.getElementsByTagName('canvas');
      let arrCons = (thread.getBsCl().getResolvedClass('[Ljava/lang/String;')).getConstructor(null);
      let arrObj = new arrCons(null, canvases.length);
      
      for(let i=0; i<canvases.length; i++){
        if(canvases[i].getAttribute('class') === 'appletReplacement'){
          let id = canvases[i].getAttribute('id');
          if(id){
            arrObj['array'][i] = initString(thread.getBsCl(), id);
          }
        }
      }
      return arrObj;
    }
  }
});

//# sourceURL=chrome-extension://haecjomoehmjbllenidmmohecalbajbe/res/natives/CanvasGraphicsEnvironment.js
