function getStringField(obj, field){
  let fieldStr = "CanvasGraphics/"+field;
  return String.fromCharCode.apply(this, 
    obj[fieldStr]["java/lang/String/value"]["array"]);
}

function getCanvasId(obj){
return String.fromCharCode.apply(this, 
    obj["CanvasGraphics/canvasId"]["java/lang/String/value"]["array"]);
}

// This entire object is exported. Feel free to define private helper functions above it.
registerNatives({
  'CanvasGraphics': {

    'clearRect(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawArc(IIIIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3, arg4, arg5) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawLine(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawOval(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawPolygon([I[II)V': function(thread, javaThis, arg0, arg1, arg2) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawPolyline([I[II)V': function(thread, javaThis, arg0, arg1, arg2) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawRect(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawRoundRect(IIIIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3, arg4, arg5) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'fillRoundRect(IIIIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3, arg4, arg5) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawString(Ljava/text/AttributedCharacterIterator;II)V': function(thread, javaThis, arg0, arg1, arg2) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawString(Ljava/lang/String;II)V': function(thread, javaThis, arg0, arg1, arg2) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'fillArc(IIIIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3, arg4, arg5) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'fillOval(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'fillPolygon([I[II)V': function(thread, javaThis, arg0, arg1, arg2) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'fillRect(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      let ctx = window.drawingContexts[getCanvasId(javaThis)];
      if(ctx){
        ctx.fillRect(arg0, arg1, arg2, arg3);
      }else{
        thread.throwNewException('Ljava/lang/IllegalStateException;', 'No canvas context');
      }
    },

    'findCanvas()Z': function(thread, javaThis) {
      let id = getCanvasId(javaThis);
      console.log("Finding canvas: "+id);
      let canvas = document.getElementById(id);
      if(canvas){
        let ctx = canvas.getContext('2d');
        window.drawingContexts = {};
        window.drawingContexts[id] = ctx;
        return true;
      }
      return false;
    },

    'getCanvasHeight()I': function(thread, javaThis) {
      let id = getCanvasId(javaThis);
      return document.getElementById(id).scrollHeight;
    },

    'setColor(Ljava/awt/Color;)V': function(thread, javaThis, arg0) {
      let ctx = window.drawingContexts[getCanvasId(javaThis)];
      if(ctx){
        let hex = (arg0['java/awt/Color/value']>>>0).toString(16);
        let red = parseInt(hex.slice(2,4), 16);
        let green = parseInt(hex.slice(4,6), 16);
        let blue = parseInt(hex.slice(6,8), 16);
        let alpha = parseInt(hex.slice(0,2), 16);
        ctx.strokeStyle = `rgba(${red},${green},${blue},${alpha/255})`;
        ctx.fillStyle = `rgba(${red},${green},${blue},${alpha/255})`;
      }else{
        thread.throwNewException('Ljava/lang/IllegalStateException;', 'No canvas context');
      }
    },
    'getColor()Ljava/awt/Color;': function(thread, javaThis, arg0) {
      let ctx = window.drawingContexts[getCanvasId(javaThis)];
      if(ctx){
        let cval;
        if(ctx.fillStyle !== ctx.strokeStyle)
          thread.throwNewException('Ljava/lang/IllegalStateException;', 'Inconsistent paint color');
        if(ctx.fillStyle[0]==='#'){
          let rgb = ctx.fillStyle.slice(1,7);
          let alpha = 'FF';
          if(ctx.fillStyle.length == 9){
            alpha = ctx.fillStyle.slice(7,9);
          }
          cval = parseInt(alpha.concat(rgb), 16)>>0;
        }else{
          thread.throwNewException('Ljava/lang/IllegalStateException;', 'DOM color unparseable');
        }

        var colorCons = (thread.getBsCl().getResolvedClass('Ljava/awt/Color;')).getConstructor(null);
        var colorObj = new colorCons(null);
        colorObj['java/awt/Color/value'] = cval;
        return colorObj;
      }else{
        thread.throwNewException('Ljava/lang/IllegalStateException;', 'No canvas context');
      }
    },

    'getCanvasWidth()I': function(thread, javaThis) {
      let id = getCanvasId(javaThis);
      return document.getElementById(id).scrollWidth;
    }

  }
});

//# sourceURL=chrome-extension://mjiafhbekjmjcgejbbjhckkpghfpblcn/res/natives/CanvasGraphics.js