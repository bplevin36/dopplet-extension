
(function(){
	let audioClips = [];

	registerNatives({
	  'CanvasAudioClip': {
	  	'constructAudio(Ljava/lang/String;)I': function(thread, javaThis, arg0){
			let url = arg0.toString();
			let clip = new Audio(url);
			return audioClips.push(clip) - 1;
	  	},
	  	'play()V': function(thread, javaThis){
	  		let index = javaThis['CanvasAudioClip/clipIndex'];
        let clip = audioClips[index];
        clip.play();
	   	},
      'loop()V': function(thread, javaThis){
        let index = javaThis['CanvasAudioClip/clipIndex'];
        let clip = audioClips[index];
        clip.loop = true;
        clip.play();
      },
      'stop()V': function(thread, javaThis){
        let index = javaThis['CanvasAudioClip/clipIndex'];
        let clip = audioClips[index];
      }
	  }
	});
})();
