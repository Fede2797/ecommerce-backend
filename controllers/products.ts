import { cloudinaryUpload } from '../helpers/cloudinaryUpload';
import Product from '../models/product'


export const newProduct = async ( req, res ) => {

  const { name, price, sizes, category, unitsSold } = req.body;
  
  const imageUrl = await cloudinaryUpload(req.file.path);

  if (!imageUrl) {
    return res.status(500).json({
      succes: false,
      message: "Error while uploading the product image"
    })
  };

  console.log({imageUrl});

  try {
  
    // Create a new product with Cloudinary image URLs
    const newProduct = new Product({
      name,
      price,
      category,
      imgSource: imageUrl,
    });
  
    // Save the product to the database
    await newProduct.save();
    
    console.log({newProduct});
    
    res.json({ message: 'Product created successfully' });
    
  } catch (error) {
    console.log({error});
  }
}