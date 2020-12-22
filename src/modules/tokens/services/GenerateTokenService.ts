import IGenerateTokenProvider from '../providers/GenerateTokenProvider/models/IGenerateTokenProvider';

export default class GenerateTokenService {
  private generateTokenProvider: IGenerateTokenProvider;

  constructor(generateTokenProvider: IGenerateTokenProvider) {
    this.generateTokenProvider = generateTokenProvider;
  }

  public async execute(): Promise<void> {
    try {
      const figmaFile = await this.generateTokenProvider.getFigmaFile();
      const stylesPage = await this.generateTokenProvider.getStylePage(
        figmaFile,
      );
      const colors = await this.generateTokenProvider.getPallete(stylesPage);
      const parsedFile = await this.generateTokenProvider.parseFile(colors);
      this.generateTokenProvider.manageVersion(parsedFile);
    } catch (e) {
      console.log(e);
    }
  }
}
