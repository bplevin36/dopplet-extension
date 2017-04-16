
import java.applet.*;
import java.lang.*;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.MalformedURLException;
import java.awt.GraphicsEnvironment;


public class Shim implements Runnable, AppletStub{

	String canvasId;
	Applet applet;
	URL codeBase;
	URL documentBase;

	public static void main(String[] args) {
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
		System.out.println("Headless? "+System.getProperty("java.awt.headless"));

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
			applet.init();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	public native void appletResize(int width, int height);
	public AppletContext getAppletContext(){
		throw new UnsupportedOperationException();
	}

	public URL getCodeBase(){
		return codeBase;
	}
	public native String getDocumentBase0();
	public URL getDocumentBase(){
		return documentBase;
	}
	public native String getParameter(String name);
	public boolean isActive(){
		return false;
	}
}