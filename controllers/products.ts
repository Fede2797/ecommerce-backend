import { cloudinaryUpload } from '../helpers/cloudinaryUpload';
import Product from '../models/product'


export const newProduct = async ( req, res ) => {

  const { name, price, sizes, category } = req.body;
  // Parses the sizes array from a string
  const parsedSizes = JSON.parse(sizes);
  console.log({parsedSizes});

  try {

    const imageUrl = await cloudinaryUpload(req.file.path);

    if (!imageUrl) {
      return res.status(500).json({
        succes: false,
        message: "Error while uploading the product image"
      })
    };

  
    // Create a new product with Cloudinary image URLs
    const newProduct = new Product({
      name,
      price,
      category,
      sizes: parsedSizes,
      imgSource: imageUrl,
    });
  
    // Save the product to the database
    await newProduct.save();
    
    console.log({newProduct});
    
    return res.status(200).json({
      succes: true,
      message: "Product created successfully"
    })
    
  } catch (error) {
    console.log({error});
    return res.status(500).json({
      succes: false,
      message: "Error while uploading the product"
    })
  }
}

export const getEveryProduct = async( req, res ) => {
  const products = await Product.find({});

  console.log(products);
  res.json(products);
}