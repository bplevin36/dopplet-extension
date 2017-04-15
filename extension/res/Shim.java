
import java.net.URL;
import java.net.MalformedURLException;
import java.util.Hashtable;
import java.lang.reflect.Method;
import java.awt.Color;

import java.awt.Rectangle;
import java.awt.Polygon;

import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.awt.Image;
import java.awt.Graphics;
import java.awt.GraphicsEnvironment;

public class Shim implements ImageObserver{
	public static native String getDocumentURL();

	public static void main(String[] args) {
		Hashtable<String,String> attributes = new Hashtable<String,String>();
		attributes.put("code", "browser");
		URL doc = null;
		try{
			doc = new URL(getDocumentURL());
		}catch(MalformedURLException e){
			e.printStackTrace();
		}
		//AppletViewerPanel appletPanel = new AppletViewerPanel(doc, attributes);
		System.out.println("Current URL: "+doc.toString() );
		//appletPanel.init();

		CanvasGraphics g = new CanvasGraphics("appletReplacement");

		g.drawOval(50, 50, 200, 100);

		ClassLoader cl = ClassLoader.getSystemClassLoader();
		try{
			Class<GraphicsEnvironment> ge = (Class<GraphicsEnvironment>)Class.forName("CanvasGraphicsEnvironment", true, cl);
		} catch (ClassNotFoundException e){
			e.printStackTrace();
		}
/*
		BufferedImage img = new BufferedImage(200, 200, BufferedImage.TYPE_INT_ARGB);
		Graphics bg = img.createGraphics();
		bg.fillRect(10, 10, 50, 50);

		g.drawImage(img, 5, 5, new Shim());
*/
		System.out.println(g.getColor().toString());
		System.out.println("Headlessness: "+System.getProperty("java.awt.headless"));

	}

	public boolean imageUpdate(Image img, int info, int x, int y, int width, int height){
		System.out.println("Image updated");
		return false;
	}
}