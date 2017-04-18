


registerNatives({
  'CanvasGraphicsConfiguration': {
    'getBounds0(Ljava/lang/String;)Ljava/awt/Rectangle;': function(thread, javaThis, arg0){
      let id = arg0.toString();
      let canvas = document.getElementById(id);
      let width = canvas.scrollWidth;
      let height = canvas.scrollHeight;
      thread.setStatus(6);
      thread.getBsCl().initializeClass(thread, 'Ljava/awt/Rectangle;', function(data){
        let rectCons = (thread.getBsCl().getClass('Ljava/awt/Rectangle;')).getConstructor(null);
        let rectObj = new rectCons(null);
        rectObj['java/awt/Rectangle/width'] = width;
        rectObj['java/awt/Rectangle/height'] = height;
        thread.asyncReturn(rectObj);
      });
    }
  }
})

//# sourceURL=chrome-extension://haecjomoehmjbllenidmmohecalbajbe/res/natives/CanvasGraphicsConfiguration.js
