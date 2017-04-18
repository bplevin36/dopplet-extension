
import java.applet.AudioClip;

public class CanvasAudioClip implements AudioClip {

	private int clipIndex;

	public CanvasAudioClip(URL url){
		clipIndex = constructAudio(url.toString());
	}

	public native void play();
	public native void loop();
	public native void stop();

	private native int constructAudio(String url);

}