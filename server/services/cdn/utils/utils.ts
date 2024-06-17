/** Join argument to match folder path for cloudinary */
export const joinImagePath = (...args: string[]) => {
    const cloudFolder = "";
    return [cloudFolder, ...args].join("/");
};
