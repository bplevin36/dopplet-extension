
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
import java.util.HashMap;
import java.util.Vector;

public class CanvasAppletContext implements AppletContext {

	private static Vector<Applet> applets = null;

	private Applet myApplet;
	private HashMap<String, InputStream> streams;

	public CanvasAppletContext(Applet app){
		if(applets == null){
			applets = new Vector<Applet>();
		}
		streams = new HashMap<String, InputStream>();
		applets.add(app);
		myApplet = app;
	}

	public Applet getApplet(String name){
		for(Enumeration<Applet> e = getApplets(); e.hasMoreElements();){
			Applet next = e.nextElement();
			if(next.getParameter("name").equals(name)){
				return next;
			}
		}
		return null;
	}

	public Enumeration<Applet> getApplets(){
		return applets.elements();
	}

	public AudioClip getAudioClip(URL url){
		throw new UnsupportedOperationException();
	}

	public Image getImage(URL url){
		throw new UnsupportedOperationException();
	}
	@Override
	public InputStream getStream(String key){
		return streams.get(key);
	}
	@Override
	public Iterator<String> getStreamKeys(){
		return streams.keySet().iterator();
	}
	@Override
	public void setStream(String key, InputStream stream){
		if(stream != null){
			streams.put(key, stream);
		}else{
			streams.remove(key);
		}
	}
	@Override
	public void showDocument(URL url){
		// ignored
	}
	@Override
	public void showDocument(URL url, String target){
		// ignored
	}
	@Override
	public native void showStatus(String status);
}