
import java.awt.GraphicsConfiguration;
import java.awt.image.*;
import java.awt.color.ColorSpace;
import java.awt.geom.AffineTransform;
import java.awt.Rectangle;
import java.awt.GraphicsDevice;

public class CanvasGraphicsConfiguration extends GraphicsConfiguration {
	
	GraphicsDevice device;
	public CanvasGraphicsConfiguration(GraphicsDevice d){
		device = d;
	}
	@Override
	public Rectangle getBounds(){
		return getBounds0(device.getIDstring());
	}
	private native Rectangle getBounds0(String id);
	@Override
	public ColorModel getColorModel(int transparency){
		ColorSpace cs = ColorSpace.getInstance(ColorSpace.CS_sRGB);
		return new ComponentColorModel(cs, true, false, transparency, DataBuffer.TYPE_BYTE);
	}
	@Override
	public ColorModel getColorModel(){
		return getColorModel(ColorModel.TRANSLUCENT);
	}
	@Override
	public AffineTransform getDefaultTransform(){
		return new AffineTransform();
	}
	@Override
	public GraphicsDevice getDevice(){
		return device;
	}
	@Override
	public AffineTransform getNormalizingTransform(){
		return new AffineTransform();
	}
	@Override
	public boolean isTranslucencyCapable(){
		return true;
	}
}