
import java.awt.GraphicsDevice;
import java.awt.GraphicsConfiguration;

public class CanvasGraphicsDevice extends GraphicsDevice {
	
	private CanvasGraphicsConfiguration gc;
	private String id;

	CanvasGraphicsDevice(String id){
		this.id = id;
		gc = new CanvasGraphicsConfiguration(this);
	}

	@Override
	public GraphicsConfiguration[] getConfigurations(){
		return new GraphicsConfiguration[]{gc};
	}
	@Override
	public GraphicsConfiguration getDefaultConfiguration(){
		return gc;
	}
	@Override
	public String getIDstring(){
		return new String(id);
	}
	@Override
	public int getType(){
		return GraphicsDevice.TYPE_RASTER_SCREEN;
	}
}