import {v2 as cloudinary} from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const cloudinaryUpload = async (path) => {
  let imageUrl;

  await cloudinary.uploader.upload(path, function (err, result){
    if(err) {
      console.log(err);
      imageUrl = "";
    }
    imageUrl = result.url;
  });

  return imageUrl;
}