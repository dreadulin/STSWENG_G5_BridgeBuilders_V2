import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSignature = (timestamp) => {
  const params = {
    timestamp: timestamp,
    folder: "BridgeBuilderMedia",
  };

  const stringToSign =
    Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&") + cloudinary.config().api_secret;

  return crypto.createHash("sha1").update(stringToSign).digest("hex");
};

const imageUploader = async (file) => {
  let imageURI = null;

  if (file) {
    const { buffer, mimetype } = file;
    const b64 = Buffer.from(buffer).toString("base64");
    const imageData = "data:" + mimetype + ";base64," + b64;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = generateSignature(timestamp);

    imageURI = await cloudinary.uploader.upload(imageData, {
      resource_type: "auto",
      folder: "BridgeBuilderMedia", // If you want to specify a folder
      timestamp: timestamp,
      signature: signature,
      api_key: cloudinary.config().api_key,
    });
  }

  return imageURI?.secure_url;
};

export default imageUploader;
