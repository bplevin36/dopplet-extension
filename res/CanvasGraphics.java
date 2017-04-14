
import java.awt.Graphics;
import java.awt.Color;
import java.awt.Shape;
import java.awt.geom.Point;

public class CanvasGraphics extends Graphics {

	private Color paintColor;
	private Shape clip;
	private Point origin;
	private Component 

	public CanvasGraphics(){
		paintColor = Color.BLACK;
		origin = new Point();
	}


	@Override
	public Font getFont(){
		throw new Exception("not implemented");
	}
}