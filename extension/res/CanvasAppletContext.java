
import java.applet.AppletContext;
import java.applet.Applet;

import java.applet.AudioClip;
import java.awt.Image;
import java.awt.Graphics;
import java.net.URL;
import java.util.Enumeration;
import java.io.InputStream;
import java.io.IOException;
import java.util.Iterator;

public class CanvasAppletContext implements AppletContext {

	public Applet getApplet(String name){
		throw new UnsupportedOperationException();
	}

	public Enumeration<Applet> getApplets(){
		throw new UnsupportedOperationException();
	}

	public AudioClip getAudioClip(URL url){
		throw new UnsupportedOperationException();
	}

	public Image getImage(URL url){
		throw new UnsupportedOperationException();
	}

	public InputStream getStream(String key){
		throw new UnsupportedOperationException();
	}
	public Iterator<String> getStreamKeys(){
		throw new UnsupportedOperationException();
	}
	public void setStream(String key, InputStream stream){
		throw new UnsupportedOperationException();
	}

	public void showDocument(URL url){
		throw new UnsupportedOperationException();
	}
	public void showDocument(URL url, String target){
		throw new UnsupportedOperationException();
	}

	public native void showStatus(String status);
}