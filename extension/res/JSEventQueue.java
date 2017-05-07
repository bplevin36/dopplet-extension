
import java.awt.EventQueue;
import java.awt.AWTEvent;

public class JSEventQueue extends EventQueue{
	public JSEventQueue(){
		super();
		System.out.println("New JSEventQueue");
	}
	@Override
	public void postEvent(AWTEvent theEvent){
		System.out.println("Posted event to queue");
		super.postEvent(theEvent);
	}
}