function getStringField(obj, field){
  let fieldStr = "CanvasGraphics/"+field;
  return String.fromCharCode.apply(this, 
    obj[fieldStr]["java/lang/String/value"]["array"]);
}

function getCanvasId(obj){
return String.fromCharCode.apply(this, 
    obj["CanvasGraphics/canvasId"]["java/lang/String/value"]["array"]);
}

function getContext(thread, obj){
  let ctx = window.drawingContexts[getCanvasId(obj)];
  if(ctx){
    return ctx;
  }else{
    thread.throwNewException('Ljava/lang/IllegalStateException;', 'No canvas context');
  }
}

function pathFromString(javaString){
  let svgStr = String.fromCharCode.apply(this,javaString["java/lang/String/value"]["array"]);
  return new Path2D(svgStr);
}

// This entire object is exported. Feel free to define private helper functions above it.
registerNatives({
  'CanvasGraphics': {

    'clearRect(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        ctx.clearRect(arg0, arg1, arg2, arg3);
      }
    },

    'drawArc(IIIIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3, arg4, arg5) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
      /*
      let ctx = getContext(thread, javaThis);
      if(ctx){
        let centerX = arg0 + arg2/2;
        let centerY = arg1 + arg3/2;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY)
      }
      */
    },

    'drawLine(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        ctx.beginPath();
        ctx.moveTo(arg0, arg1);
        ctx.lineTo(arg2, arg3);
        ctx.stroke();
      }
    },

    'drawOval(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'drawPolygon0(Ljava/lang/String;)V': function(thread, javaThis, arg0) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        let path = pathFromString(arg0);
        ctx.stroke(path);
      }
    },

    'drawPolyline([I[II)V': function(thread, javaThis, arg0, arg1, arg2) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        ctx.beginPath();
        ctx.moveTo(arg0['array'][0], arg1['array'][0]);
        for(let ct = 1; ct < arg2; ct++){

        }
      }
    },

    'drawRect(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        ctx.rect(arg0, arg1, arg2, arg3);
        ctx.stroke();
      }
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

    'fillPolygon0(Ljava/lang/String;)V': function(thread, javaThis, arg0) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        let path = pathFromString(arg0);
        ctx.fill(path);
      }
    },

    'fillRect(IIII)V': function(thread, javaThis, arg0, arg1, arg2, arg3) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        ctx.fillRect(arg0, arg1, arg2, arg3);
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
        window.drawingClips = {};
        return true;
      }
      return false;
    },

    'getCanvasHeight()I': function(thread, javaThis) {
      let id = getCanvasId(javaThis);
      return document.getElementById(id).scrollHeight;
    },

    'getClip()Ljava/awt/Shape;': function(thread, javaThis) {
      thread.throwNewException('Ljava/lang/UnsatisfiedLinkError;', 'Native method not implemented.');
    },

    'setClip0(Ljava/lang/String;)V': function(thread, javaThis, arg0) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        let newClip = pathFromString(arg0);
        ctx.clip(newClip);
        window.drawingClips[getCanvasId(javaThis)] = newClip;
      }
    },

    'setColor(Ljava/awt/Color;)V': function(thread, javaThis, arg0) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        let hex = (arg0['java/awt/Color/value']>>>0).toString(16);
        let red = parseInt(hex.slice(2,4), 16);
        let green = parseInt(hex.slice(4,6), 16);
        let blue = parseInt(hex.slice(6,8), 16);
        let alpha = parseInt(hex.slice(0,2), 16);
        ctx.strokeStyle = `rgba(${red},${green},${blue},${alpha/255})`;
        ctx.fillStyle = `rgba(${red},${green},${blue},${alpha/255})`;
      }
    },
    'getColor()Ljava/awt/Color;': function(thread, javaThis, arg0) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        let cval;
        if(ctx.fillStyle !== ctx.strokeStyle)
          thread.throwNewException('Ljava/lang/IllegalStateException;', 'Inconsistent canvas paint color state');
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
      }
    },

    'getCanvasWidth()I': function(thread, javaThis) {
      let id = getCanvasId(javaThis);
      return document.getElementById(id).scrollWidth;
    },
    'translate(II)V': function(thread, javaThis, arg0, arg1) {
      let ctx = getContext(thread, javaThis);
      if(ctx){
        ctx.translate(arg0, arg1);
      }
    }
  }
});

//# sourceURL=chrome-extension://mdfmmbhnifgbkgpibjdeljpbmmffgkca/res/natives/CanvasGraphics.js