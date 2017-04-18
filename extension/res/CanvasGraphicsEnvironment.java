
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Locale;


public class CanvasGraphicsEnvironment extends GraphicsEnvironment {

    private GraphicsDevice[] devices;

    private native String[] getCanvases();

    public CanvasGraphicsEnvironment(){
        String[] canvases = getCanvases();
        devices = new GraphicsDevice[canvases.length];
        for(int i=0; i<canvases.length; i++){
            devices[i] = new CanvasGraphicsDevice(canvases[i]);
        }
    }
    @Override
    public native Graphics2D createGraphics(BufferedImage img);
    @Override
    public Font[] getAllFonts(){
        return new Font[0];
    }
    @Override
    public String[] getAvailableFontFamilyNames(){
        return new String[0];
    }
    @Override
    public String[] getAvailableFontFamilyNames(Locale l){
        return getAvailableFontFamilyNames();
    }

    @Override 
    public GraphicsDevice getDefaultScreenDevice(){
        return devices[0];
    }
    @Override
    public GraphicsDevice[] getScreenDevices(){
        return devices;
    }
}
