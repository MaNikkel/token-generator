import IGenerateTokenProvider from '../providers/GenerateTokenProvider/models/IGenerateTokenProvider';
import IUploadTokenFileProvider from '../providers/UploadTokenFileProvider/models/IUploadTokenFileProvider';

export default class GenerateTokenService {
  private generateTokenProvider: IGenerateTokenProvider;

  private uploadTokenFileProvider: IUploadTokenFileProvider;

  constructor(
    generateTokenProvider: IGenerateTokenProvider,
    uploadTokenFileProvider: IUploadTokenFileProvider,
  ) {
    this.generateTokenProvider = generateTokenProvider;
    this.uploadTokenFileProvider = uploadTokenFileProvider;
  }

  public async execute(): Promise<void> {
    try {
      const figmaFile = await this.generateTokenProvider.getFigmaFile();
      const stylesPage = await this.generateTokenProvider.getStylePage(
        figmaFile,
      );
      const colors = await this.generateTokenProvider.getPallete(stylesPage);
      const parsedFile = await this.generateTokenProvider.parseFile(colors);
      await this.generateTokenProvider.manageVersion(parsedFile);
      // const latest = await this.generateTokenProvider.returnLatestTokens();
      // await this.uploadTokenFileProvider.upload(latest);
    } catch (e) {
      // console.log(e);
      throw new Error(e);
    }
  }
}
