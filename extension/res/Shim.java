
import java.net.URL;
import java.net.MalformedURLException;
import java.util.Hashtable;
import sun.applet.AppletViewerPanel;
import java.lang.reflect.Method;
import java.awt.Color;



public class Shim {
	public static native String getDocumentURL();

	public static void main(String[] args) {
		Hashtable attributes = new Hashtable<String,String>();
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
		g.fillRect(100, 100, 100, 100);

		g.setColor(Color.GREEN);
		g.fillRect(50, 50, 25, 25);
		System.out.println(g.getColor().toString());

	}
}