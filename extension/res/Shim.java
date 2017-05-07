
import java.applet.*;
import java.lang.*;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.MalformedURLException;

import java.awt.GraphicsEnvironment;
import java.awt.Panel;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.Dimension;

import java.awt.EventQueue;
import java.awt.Toolkit;


public class Shim extends Panel implements Runnable, AppletStub {
	String canvasId;
	Applet applet;
	AppletContext context;
	URL codeBase;
	URL documentBase;
	int status = APPLET_DISPOSE;
	Dimension currentAppletSize;
	ListenerTester listener;

	public static void main(String[] args) {
		//TODO programatically set canvasId param
		Shim myShim = new Shim("applet0");
		new Thread(myShim).start();
	}

	public Shim(String canvas){
		super();
		currentAppletSize = new Dimension(10, 10);
		listener = new ListenerTester(this);
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
		setVisible(true);
	}

	public void run() {

		ClassLoader cl = this.getClass().getClassLoader();
		Class<? extends Applet> codeClass=null;
		try{
			codeClass = (Class<? extends Applet>)cl.loadClass(getParameter("data-code"));
		}catch(ClassNotFoundException e){
			e.printStackTrace();
		}

		try{
			applet = codeClass.newInstance();
			if(applet != null){
				context = new CanvasAppletContext(applet);
				applet.setStub(this);
				applet.setVisible(false);
				add("Center", applet);
				// optionally show status here
				currentAppletSize.width = getWidth();
				currentAppletSize.height = getHeight();
				this.setSize(currentAppletSize);
				applet.resize(currentAppletSize.width, currentAppletSize.height);
				applet.init();
				this.validate();
				status = APPLET_INIT;
				/*EventQueue eq = Toolkit.getEventQueue();
				System.out.println("Toolkit: "+eq.toString());
				*/

				// TODO: figure out this stuff with AppContext that creates EventQueue and so on
				this.setVisible(true);
				//this.repaint();
				PaintEvent e = new PaintEvent(this, PaintEvent.UPDATE,
                                              new Rectangle(x, y, width, height));
                CanvasToolkit.getSystemEventQueueImpl().postEvent(e);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		attachListener();
		try{
			Thread.sleep(60000);
		}catch (InterruptedException e){
			e.printStackTrace();
		}
	}
	@Override
	public void addNotify(){
		super.addNotify();
		System.out.println("shim addNotified");
	}
	@Override
	public void show(){
		if(getPeer() == null){
			addNotify();
		}
		super.show();
	}
	@Override
	public void update(Graphics g){
		super.update(g);
		System.out.println("Top level update");
		paint(g);
	}
	@Override
	public void paint(Graphics g){
		super.paint(g);
		System.out.println("Top level paint");
	}

	private native void attachListener();
	@Override
	public void appletResize(int width, int height){
		currentAppletSize.width = width;
		currentAppletSize.height = height;

		appletResize0(width, height);
	}
	private native void appletResize0(int width, int height);
	@Override
	public AppletContext getAppletContext(){
		return context;
	}
	@Override
	public URL getCodeBase(){
		return codeBase;
	}
	private native String getDocumentBase0();
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
	public int getWidth() {
        String w = getParameter("width");
        if (w != null) {
            return Integer.valueOf(w).intValue();
        }
        return 0;
    }
    public int getHeight() {
        String h = getParameter("height");
        if (h != null) {
            return Integer.valueOf(h).intValue();
        }
        return 0;
    }

    public final static int APPLET_DISPOSE = 0;
    public final static int APPLET_LOAD = 1;
    public final static int APPLET_INIT = 2;
    public final static int APPLET_START = 3;
    public final static int APPLET_STOP = 4;
    public final static int APPLET_DESTROY = 5;
    public final static int APPLET_QUIT = 6;
    public final static int APPLET_ERROR = 7;
}