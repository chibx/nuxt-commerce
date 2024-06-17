import ImageKit from "imagekit";
import { FileType } from "imagekit/dist/libs/interfaces";

const imageKit = new ImageKit({
    privateKey: "",
    publicKey: "",
    urlEndpoint: "",
});

const image = await imageKit.upload({ file: "", fileName: "" });

image;

export interface ImageKitUploadResponse {
    /**
     * Unique fileId. Store this fileld in your database, as this will be used to perform update action on this file.
     */
    fileId: string;
    /**
     * The name of the uploaded file.
     */
    name: string;
    /**
     * The URL of the file.
     */
    url: string;
    /**
     * In case of an image, a small thumbnail URL.
     */
    thumbnailUrl: string;
    /**
     * Height of the uploaded image file. Only applicable when file type is image.
     */
    height: number;
    /**
     * Width of the uploaded image file. Only applicable when file type is image.
     */
    width: number;
    /**
     * Size of the uploaded file in bytes.
     */
    size: number;
    /**
     * Type of file. It can either be image or non-image.
     */
    fileType: FileType;
    /**
     * The path of the file uploaded. It includes any folder that you specified while uploading.
     */
    filePath: string;
    /**
     * Array of tags associated with the image.
     */
    tags?: string[];
    /**
     * Is the file marked as private. It can be either true or false.
     */
}
