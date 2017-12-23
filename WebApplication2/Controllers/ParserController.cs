using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    public class ParserController : ApiController
    {
        private bool CheckColor(Color color, int r, int g, int b)
        {
            bool red = color.R == r;
            bool green = color.G == g;
            bool blue = color.B == b;
            return red & green & blue;
        }

        private bool CheckForRelevant(Color color, int r ,int g , int b) {
            bool red = color.R - 10 < r & color.R + 10 > r;
            bool green = color.G - 10 < g & color.G + 10 > g;
            bool blue = color.B - 10 < b & color.B + 10 > b;
            return red & green & blue;
        }

        private int AnalizeArea(Color color, int r, int g, int b ,Bitmap bitmap , int xPos , int yPos)
        {
            int counter = 0;
            for (int Xcount = xPos - 2; Xcount < xPos + 3; Xcount++)
            {
                for (int Ycount = yPos - 5; Ycount < yPos + 5; Ycount++)
                {
                    if (Xcount > 0 & Ycount > 0 & bitmap.Height > Ycount & bitmap.Width > Xcount)
                    {
                        Color col = bitmap.GetPixel(Xcount, Ycount);
                        if (CheckForRelevant(col, r, g, b))
                        {
                            counter++;
                        } 
                    }

                }
            }
            return counter;
        }



        [HttpPost]
        public string Post(ImageData image)
        {
            try
            {
                switch (image.Mode)
                {
                    case 1:
                        return DrawSmartImage(image);
                    case 2:
                        return DrawImageBySelectedArea(image);
                    default:
                        return "";
                };
            }
            catch (Exception ex)
            {
                return ex.Message;
                throw;
            }
            return "";
        }

        private string DrawSmartImage(ImageData image)
        {
            byte[] bitmapDataImage = Convert.FromBase64String(image.Image);
            byte[] bitmapDataLayer = Convert.FromBase64String(image.Layer);
            System.IO.MemoryStream streamBitmapImage = new System.IO.MemoryStream(bitmapDataImage);
            System.IO.MemoryStream streamBitmapLayer = new System.IO.MemoryStream(bitmapDataLayer);
            Bitmap bitImage = new Bitmap((Bitmap)Image.FromStream(streamBitmapImage));
            Bitmap bitLayer = new Bitmap((Bitmap)Image.FromStream(streamBitmapLayer));
            Bitmap newImage = new Bitmap(bitImage.Width, bitImage.Height);
            for (int Xcount = 0; Xcount < bitImage.Width; Xcount++)
            {
                for (int Ycount = 0; Ycount < bitImage.Height; Ycount++)
                {
                    Color layerColor = bitLayer.GetPixel(Xcount, Ycount);
                    Color imageColor = bitImage.GetPixel(Xcount, Ycount);
                    if (!CheckForRelevant(imageColor, image.R, image.G, image.B) || CheckColor(layerColor, 255, 0, 0))
                    {  
                        newImage.SetPixel(Xcount, Ycount, imageColor);
                    }
                }
            }
            ImageConverter converter = new ImageConverter();
            byte[] newByteArray = (byte[])converter.ConvertTo(newImage, typeof(byte[]));
            string base64String = Convert.ToBase64String(newByteArray);
            return base64String;
        }

        private string DrawImageBySelectedArea(ImageData image)
        {
            byte[] bitmapDataImage = Convert.FromBase64String(image.Image);
            byte[] bitmapDataLayer = Convert.FromBase64String(image.Layer);
            System.IO.MemoryStream streamBitmapImage = new System.IO.MemoryStream(bitmapDataImage);
            System.IO.MemoryStream streamBitmapLayer = new System.IO.MemoryStream(bitmapDataLayer);
            Bitmap bitImage = new Bitmap((Bitmap)Image.FromStream(streamBitmapImage));
            Bitmap bitLayer = new Bitmap((Bitmap)Image.FromStream(streamBitmapLayer));
            Bitmap newImage = new Bitmap(bitImage.Width, bitImage.Height);
            //Graphics g = Graphics.FromImage(newImage);
            //g.DrawRectangle(new Pen(new SolidBrush(Color.White)), 0, 0, newImage.Width, newImage.Height);
            //g.DrawImage(bitImage, 0, 0);
            for (int Xcount = 0; Xcount < bitImage.Width; Xcount++)
            {
                for (int Ycount = 0; Ycount < bitImage.Height; Ycount++)
                {
                    Color layerColor = bitLayer.GetPixel(Xcount, Ycount);
                    if (CheckColor(layerColor, 255, 0, 0))
                    {
                        //if (30 > AnalizeArea(color, 19, 255, 9, bitImage, Xcount, Ycount))
                        //{
                        Color imageColor = bitImage.GetPixel(Xcount, Ycount);
                        newImage.SetPixel(Xcount, Ycount, imageColor);
                    }
                    //}
                }
            }
            ImageConverter converter = new ImageConverter();
            byte[] newByteArray = (byte[])converter.ConvertTo(newImage, typeof(byte[]));
            string base64String = Convert.ToBase64String(newByteArray);
            return base64String;
        }
    }




    public class ImageData
    {
        public string Image { get; set; }
        public string Layer { get; set; }
        public int Mode { get; set; }
        public int R { get; set; }
        public int G { get; set; }
        public int B { get; set; }

    }
}
