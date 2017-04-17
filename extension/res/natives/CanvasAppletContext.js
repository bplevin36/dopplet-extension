registerNatives({
  'CanvasAppletContext': {
  	'showStatus(Ljava/lang/String;)V': function(thread, javaThis, arg0){
  		let statusBoxes = document.getElementsByClassName("appletStatus");
  		statusBoxes.forEach(function(box){
  			box.innerText = arg0.toString();
  		});
  	}
  }
});
