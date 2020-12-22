export default interface IUploadTokenFileProvider {
  upload(tokens: any): Promise<void>;
}
