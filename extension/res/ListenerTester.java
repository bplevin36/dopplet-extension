
import java.lang.Thread;

public class ListenerTester extends Thread {
	Shim parent;
	public ListenerTester(Shim parent){
		super();
		this.parent = parent;
	}
	@Override
	public void run(){
		System.out.println("Tester called on thread "+Thread.currentThread().toString());
		if(parent.listener == this){
			System.out.println("reinitializing tester");
			parent.listener = new ListenerTester(this.parent);
		}
	}
}