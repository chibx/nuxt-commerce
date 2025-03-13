import { v2 } from "cloudinary";
export const cloudFolder = "everything-enterprise";

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
