import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dq865v781",
  api_key: "169271539931761",
  api_secret: "LyEu7YwVwwBrMtSKDuIldHZDxdE", // Click 'View API Keys' above to copy your API secret
});

const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log("Failed to delete image from server", error);
    }
    //console.log(result);
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};
const deleteImageOnCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export { uploadImageOnCloudinary, deleteImageOnCloudinary };
