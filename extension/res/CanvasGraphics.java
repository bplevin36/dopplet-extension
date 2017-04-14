

import java.awt.Graphics;
import java.awt.Color;
import java.awt.Shape;
import java.awt.Rectangle;
import java.awt.Point;
import java.awt.Component;
import java.awt.Font;
import java.awt.FontMetrics;

import java.awt.Image;
import java.awt.image.ImageObserver;

import java.text.AttributedCharacterIterator;

public class CanvasGraphics extends Graphics {

	private String canvasId;
	private Shape clip;
	private Point origin;
	private Component target;

	public CanvasGraphics(String id){
		canvasId = id;
		if(!findCanvas()){
			throw new IllegalStateException("Could not find canvas on page");
		}
		clip = new Rectangle(0, 0, getCanvasWidth(), getCanvasHeight());
		origin = new Point();		
	}


	@Override
	public native void clearRect(int x, int y, int width, int height);

	@Override
	public void clipRect(int x, int y, int width, int height){
		throw new UnsupportedOperationException();
	}
	@Override
	public void copyArea(int x, int y, int width, int height, int dx, int dy){
		throw new UnsupportedOperationException();
	}
	@Override
	public Graphics create(){
		throw new UnsupportedOperationException();
	}
	@Override
	public void dispose(){
		throw new UnsupportedOperationException();
	}
	@Override
	public native void drawArc(int x, int y, int width, int height, int startAngle, int arcAngle);

	@Override
	public boolean drawImage(Image img, int x, int y, Color bgcolor, ImageObserver observer){
		throw new UnsupportedOperationException();
	}
	@Override
	public boolean drawImage(Image img, int x, int y, ImageObserver observer){
		throw new UnsupportedOperationException();
	}
	@Override
	public boolean drawImage(Image img, int x, int y, int width, int height,
		Color bgcolor, ImageObserver observer){
		throw new UnsupportedOperationException();
	}
	@Override
	public boolean drawImage(Image img, int x, int y, int width, int height,
		ImageObserver observer){
		throw new UnsupportedOperationException();
	}
	@Override
	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2, int sx1,
		int sy1, int sx2, int sy2, Color bgcolor, ImageObserver observer){
		throw new UnsupportedOperationException();
	}
	@Override
	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2, int sx1, int sy1,
		 int sx2, int sy2, ImageObserver observer){
		throw new UnsupportedOperationException();
	}

	@Override
	public native void drawLine(int x1, int y1, int x2, int y2);
	@Override
	public native void drawOval(int x, int y, int width, int height);
	@Override
	public native void drawPolygon(int[] xPoints, int[] yPoints, int nPoints);
	@Override
	public native void drawPolyline(int[] xPoints, int[] yPoints, int nPoints);
	@Override
	public native void drawRect(int x, int y, int width, int height);
	@Override
	public native void drawRoundRect(int x, int y, int width, int height, 
		int arcWidth, int arcHeight);
	@Override
	public native void fillRoundRect(int x, int y, int width, int height,
        int arcWidth, int arcHeight);
	@Override
	public native void drawString(AttributedCharacterIterator iterator, int x, int y);
	@Override
	public native void drawString(String str, int x, int y);
	@Override
	public native void fillArc(int x, int y, int width, int height, int startAngle, int arcAngle);
	@Override
	public native void fillOval(int x, int y, int width, int height);
	@Override
	public native void fillPolygon(int[] xPoints, int[] yPoints, int nPoints);
	@Override
	public native void fillRect(int x, int y, int width, int height);

	@Override
	public Shape getClip(){
		return clip;
	}
	@Override
	public Rectangle getClipBounds(){
		return clip.getBounds();
	}
	@Override
	public native Color getColor();

	@Override
	public Font getFont(){
		throw new UnsupportedOperationException();
	}
	@Override
	public FontMetrics getFontMetrics(Font f){
		throw new UnsupportedOperationException();
	}
	@Override
	public void setClip(int x, int y, int width, int height){
		clip = new Rectangle(x, y, width, height);
	}
	@Override
	public void setClip(Shape c){
		clip = c;
	}
	@Override
	public native void setColor(Color c);

	@Override
	public void setFont(Font font){
		throw new UnsupportedOperationException();
	}
	@Override
	public void setPaintMode(){
		throw new UnsupportedOperationException();
	}
	@Override
	public void setXORMode(Color c1){
		throw new UnsupportedOperationException();
	}
	@Override
	public void translate(int x, int y){
		origin.translate(x, y);
	}



	private native boolean findCanvas();
	private native int getCanvasHeight();
	private native int getCanvasWidth();
}