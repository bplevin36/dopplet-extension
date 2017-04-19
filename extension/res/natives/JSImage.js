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
  'JSImage': {
  	'createCanvas(II)Ljava/lang/String;': function(thread, javaThis, width, height){
      let area = document.getElementById('imageBuffers');
      let newCanvas = document.createElement('canvas');
      newCanvas.width = width;
      newCanvas.height = height;
      newCanvas.id = "buffer" + area.childElementCount;
      area.appendChild(newCanvas);
      return initString(thread.getBsCl(), newCanvas.id);
  	}
  }
});

//# sourceURL=chrome-extension://haecjomoehmjbllenidmmohecalbajbe/res/natives/JSImage.js
