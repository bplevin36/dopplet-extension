package sun.applet;

import java.net.URL;
import java.net.MalformedURLException;
import java.util.Hashtable;
import sun.applet.AppletViewerPanel;
import java.lang.reflect.Method;


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
		AppletViewerPanel appletPanel = new AppletViewerPanel(doc, attributes);
		System.out.println("Current URL: "+doc.toString() );
		appletPanel.init();
		try{
			Class<?> browserClass = Class.forName("browser");
			Method mainMethod = browserClass.getMethod("main", String[].class);
			Object[] arguments = new Object[1];
			arguments[0] = new String("dynamicArg");
			mainMethod.invoke(null, arguments);

		}catch(Exception e){
			e.printStackTrace();
		}

	}
}