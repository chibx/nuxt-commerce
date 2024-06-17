// import {} from "";

export default abstract class BaseImageProvider {
    abstract _sdk: unknown;
    abstract upload(): Promise<unknown>;
    abstract getUrl(imageInfo: ImageInfo): string;
}

type ImageInfo = {
    asset_id?: string;
    public_id?: string;
};
