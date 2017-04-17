
import java.applet.*;
import java.lang.*;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.MalformedURLException;
import java.awt.GraphicsEnvironment;
import java.awt.Panel;


public class Shim extends Panel implements Runnable, AppletStub {

	String canvasId;
	Applet applet;
	URL codeBase;
	URL documentBase;

	public static void main(String[] args) {
		//TODO programatically set canvasId param
		Shim myShim = new Shim("appletReplacement");
		new Thread(myShim).start();
	}

	public Shim(String canvas){
		try{
			canvasId = canvas;
			documentBase = new URL(getDocumentBase0());
			String cb = getParameter("codebase");
			if(cb == null){
				String doc = getDocumentBase0();
				int i = doc.lastIndexOf('/');
				if(i>=0 && i<doc.length()-1){
					codeBase = new URL(documentBase, doc.substring(0, i+1));
				}
			}else{
				codeBase = new URL(cb);
			}
		}catch(MalformedURLException e){
			e.printStackTrace();
		}
	}

	public void run() {
		System.out.println("Document: " + getDocumentBase());
		System.out.println("Codebase: "+ getCodeBase());
		System.out.println("Code: "+ getParameter("data-code"));
		System.out.println("D? "+getParameter("d"));
		System.out.println("Headless? "+GraphicsEnvironment.isHeadless());
		System.out.println("AT? "+System.getProperty("javax.accessibility.assistive_technologies"));

		ClassLoader cl = this.getClass().getClassLoader();
		Class<? extends Applet> codeClass=null;
		try{
			codeClass = (Class<? extends Applet>)cl.loadClass(getParameter("data-code"));
		}catch(ClassNotFoundException e){
			e.printStackTrace();
		}
		Method[] methods = codeClass.getDeclaredMethods();
		for(int i=0; i < methods.length; i++){
			System.out.println(methods[i].toString());
		}
		try{
			applet = codeClass.newInstance();
			if(applet != null){
				applet.setStub(this);
				applet.setVisible(false);
				add("Center", applet);

				
				applet.init();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	@Override
	public native void appletResize(int width, int height);
	@Override
	public AppletContext getAppletContext(){
		throw new UnsupportedOperationException();
	}
	@Override
	public URL getCodeBase(){
		return codeBase;
	}
	public native String getDocumentBase0();
	@Override
	public URL getDocumentBase(){
		return documentBase;
	}
	@Override
	public native String getParameter(String name);
	@Override
	public boolean isActive(){
		return false;
	}
}