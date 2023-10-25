package tw.com.tradevan.petax.util;

import org.apache.commons.lang3.StringUtils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.geom.RoundRectangle2D.Double;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

/**
 *
 *  由 Itax util  ValidateCode 取出修逮
 *  改回傳 buffImage BASE 64
 *  和對應的PARE
 *
 */
public class ValidateCode {


    private char[] codeSequence = new char[]{'2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'd', 'e', 'f', 'h', 'k', 'n', 'p', 't', 'u', 'y'};//會產生的文字內容 請避免 1l O0 等數字和英文太相似的
    private int codeCount = 6;//產生驗證碼
    private String code = null;
    private int fontHeight;
    private int codeX;
    private int codeY;
    private int imageWidth = 135;
    private int imageHeight = 35;
    private BufferedImage buffImage = null;
    private int interferenceCount = 50;
    private int interferencePoint = 30;
    private Color lineColor = new Color(255, 240, 172);
    private Color pointColor = new Color(255, 240, 172);

    public ValidateCode() {
    }

    public char[] getCodeSequence() {
        return this.codeSequence;
    }

    public void setCodeSequence(char[] codeSequence) {
        this.codeSequence = codeSequence;
    }

    public ValidateCode(int codeCount) {
        this.codeCount = codeCount;
    }

    public ValidateCode(int codeCount, int interferenceCount) {
        this.codeCount = codeCount;
        this.interferenceCount = interferenceCount;
    }

    public ValidateCode(int codeCount, int imageWidth, int imageHeight) {
        this.codeCount = codeCount;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
    }

    public ValidateCode(int codeCount, int interferenceCount, int imageWidth, int imageHeight) {
        this.codeCount = codeCount;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.interferenceCount = interferenceCount;
    }


    private String getRandomString() {
        StringBuffer buffer = new StringBuffer();
        buffer.append(this.codeSequence[ SecureRandomUtils.getRandom(this.codeSequence.length)]);
        return buffer.toString();
    }

    private Color getRandomColor() {
        return new Color(SecureRandomUtils.getRandom(255), SecureRandomUtils.getRandom(255), SecureRandomUtils.getRandom(255));
    }

    private Color getReverseColor(Color c) {
        return new Color(255 - c.getRed(), 255 - c.getGreen(), 255 - c.getBlue());
    }

    public void createCode() {
        createCode(null);
    }

    public void createCode(String vcode) {

        if(code!= null){//已製造
            return;
        }

        this.buffImage = new BufferedImage(this.imageWidth, this.imageHeight, 1);
        Graphics2D graphics2D = this.buffImage.createGraphics();
        this.codeX = 5;
        this.fontHeight = this.imageHeight - 8;
        this.codeY = this.imageHeight - 7;
        StringBuffer randomCode = new StringBuffer();
        String randomString = null;
        Color color = this.getRandomColor();
        this.getReverseColor(color);
        Font baseFont = new Font("Dialog", 1, this.fontHeight);
        graphics2D.setFont(baseFont);
        GradientPaint grad_paint = new GradientPaint(0.0F, 0.0F, new Color(255, 255, 255), 0.0F, (float)this.imageHeight, new Color(128, 128, 128));
        graphics2D.setPaint(grad_paint);
        graphics2D.fill(new Double(0.0D, 0.0D, (double)this.imageWidth, (double)this.imageHeight, 0.0D, 0.0D));

        int i;
        for(i = 0; i < this.interferencePoint; ++i) {
            int x1 = SecureRandomUtils.getRandom(this.imageWidth);
            int y1 = SecureRandomUtils.getRandom(this.imageHeight);
            graphics2D.setColor(this.pointColor);
            graphics2D.drawRoundRect(x1, y1, 1, 1, 1, 1);
        }

        for(i = 0; i < this.interferenceCount; ++i) {
            graphics2D.setColor(this.lineColor);
            graphics2D.drawLine(SecureRandomUtils.getRandom(this.imageWidth), SecureRandomUtils.getRandom(this.imageHeight), SecureRandomUtils.getRandom(this.imageWidth), SecureRandomUtils.getRandom(this.imageHeight));
        }

        for(i = 0; i < this.codeCount; ++i) {
            AffineTransform fontAT = new AffineTransform();
            fontAT.shear(-0.01D * (double)SecureRandomUtils.getRandom(50), 0.01D * (double)SecureRandomUtils.getRandom(6));
            Font derivedFont = baseFont.deriveFont(fontAT);
            graphics2D.setFont(derivedFont);
            if (i % 2 == 0) {
                graphics2D.setColor(new Color(0, 76, 153));
            } else {
                graphics2D.setColor(new Color(SecureRandomUtils.getRandom(255), 76, 0));
            }

            if(StringUtils.isNotEmpty(vcode)){
                randomString = vcode.substring(i,i+1);
            }else{
                randomString = this.getRandomString();
            }
            graphics2D.drawString(randomString, this.codeX + 20 * i, this.codeY);
            randomCode.append(randomString);
        }

        graphics2D.setColor(Color.BLACK);
        graphics2D.drawRect(0, 0, this.imageWidth - 1, this.imageHeight - 1);
        this.code = randomCode.toString();

    }

    public void write(String path) throws IOException {
        try(OutputStream sos = new FileOutputStream(path)){
            this.write(sos);
        }
    }

    public void write(OutputStream sos) throws IOException {

        if (this.buffImage == null) {
            this.createCode();
        }
        ImageIO.write(buffImage, "jpg", sos);
        sos.close();

    }

    public String getBase64Img() throws IOException {

        if (this.buffImage == null) {
            this.createCode();
        }
        return this.toBase64(buffImage, "jpg");

    }

    private String toBase64(BufferedImage bi, String format)  throws IOException {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, format, baos);
        return Base64.getEncoder().encodeToString(baos.toByteArray());

    }

    public int getCodeCount() {
        return this.codeCount;
    }

    public void setCodeCount(int codeCount) {
        this.codeCount = codeCount;
    }

    public int getImageWidth() {
        return this.imageWidth;
    }

    public void setImageWidth(int imageWidth) {
        this.imageWidth = imageWidth;
    }

    public int getImageHeight() {
        return this.imageHeight;
    }

    public void setImageHeight(int imageHeight) {
        this.imageHeight = imageHeight;
    }

    public String getCode() {
        return this.code;
    }

    public BufferedImage getBuffImage() {
        return this.buffImage;
    }

    public int getFontHeight() {
        return this.fontHeight;
    }

    public void setFontHeight(int fontHeight) {
        this.fontHeight = fontHeight;
    }

    public int getInterferenceCount() {
        return this.interferenceCount;
    }

    public void setInterferenceCount(int interferenceCount) {
        this.interferenceCount = interferenceCount;
    }

}
