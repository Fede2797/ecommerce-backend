const { Product } = require('../models/product');

export const newProduct = ( req, res ) => {

  console.log("Llega a new product");
  const { name, imgSource, fullImgSource, price, sizes, category, unitsSold } = req.body;


  res.json("Hola");

  // TODO: Get images from body and upload them to cloudinary
  // TODO+ Get the links from cloudinary response and add them to de product imgSource and fullImgSource
  const product = new Product({ name, imgSource, fullImgSource, price, sizes, category, unitsSold });
}