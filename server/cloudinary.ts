import { v2 } from "cloudinary";
export const PRODUCTS = "products";

const {
	cloudinaryApiSecret,
	cloudinaryApiKey,
	public: { cloudinaryCloudName },
} = useRuntimeConfig();

export const cloudinary = v2;

cloudinary.config({
	cloud_name: cloudinaryCloudName,
	api_key: cloudinaryApiKey,
	api_secret: cloudinaryApiSecret,
	secure: true,
});
