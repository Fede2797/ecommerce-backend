"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryUpload = async (path) => {
    let imageUrl;
    await cloudinary_1.v2.uploader.upload(path, function (err, result) {
        if (err) {
            console.log(err);
            imageUrl = "";
        }
        imageUrl = result.url;
    });
    return imageUrl;
};
exports.cloudinaryUpload = cloudinaryUpload;
