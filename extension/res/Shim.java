
import java.net.URL;
import java.net.MalformedURLException;
import java.util.Hashtable;
import java.lang.reflect.Method;
import java.awt.Color;

import java.awt.Rectangle;
import java.awt.Polygon;

public class Shim {
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

		g.drawPolyline(new int[]{20,100,120},new int[]{20,20,70},3);

		g.setColor(Color.RED);

		g.fillRect(100, 100, 100, 100);
		//g.clearRect(50, 25, 75, 100);

		System.out.println(g.getColor().toString());

	}
}