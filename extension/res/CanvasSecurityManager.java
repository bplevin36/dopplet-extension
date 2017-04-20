
import java.lang.*;

public class CanvasSecurityManager extends SecurityManager {
	@Override
	public void checkExit(int status){
		throw new SecurityException();
	}
}