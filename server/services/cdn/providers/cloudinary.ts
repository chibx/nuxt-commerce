import { v2 } from "cloudinary";
export const cloudFolder = "everything-enterprise";
v2.config({
    cloud_name: "",
    api_key: "",
    api_secret: "",
    secure: true,
});

export const cloudinary = v2;
cloudinary.uploader.upload_stream({});

export interface UploadApiResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: "image" | "video" | "raw" | "auto";
    created_at: string;
    tags: Array<string>;
    pages: number;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
    moderation: Array<string>;
    access_control: Array<string>;
    context: object; //won't change since it's response, we need to discuss documentation team about it before implementing.
    metadata: object; //won't change since it's response, we need to discuss documentation team about it before implementing.
    colors?: [string, number][];
}
