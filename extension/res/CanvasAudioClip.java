
import java.applet.AudioClip;

public class CanvasAudioClip implements AudioClip {

	private String src;

	public CanvasAudioClip(URL url){
		src = url.toString();
		constructAudio(src);
	}

	public native void play();
	public native void loop();
	public native void stop();

	private native int constructAudio(String url);

}