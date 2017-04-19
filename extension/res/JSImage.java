
import java.awt.image.*;
import java.awt.GraphicsEnvironment;
import java.awt.GraphicsDevice;
import java.awt.GraphicsConfiguration;
import java.awt.Graphics;

public class JSImage extends BufferedImage {

	private String canvasId;
	ColorModel colorModel;
	int imageType;

	public JSImage(int width, int height){
		super(width, height, BufferedImage.TYPE_INT_ARGB);
		GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
		GraphicsDevice gd = ge.getDefaultScreenDevice();
		GraphicsConfiguration gc = gd.getDefaultConfiguration();
		colorModel = gc.getColorModel();
		imageType = BufferedImage.TYPE_INT_ARGB;
		canvasId = createCanvas(width, height);

	}

	public Graphics getGraphics(){
		return new CanvasGraphics(this.canvasId);
	}

	public String getId(){
		return new String(canvasId);
	}

	private native String createCanvas(int width, int height);
}