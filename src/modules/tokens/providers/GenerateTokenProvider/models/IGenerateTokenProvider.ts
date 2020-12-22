export default interface IGenerateTokenProvider {
  getPallete(stylePage: any): Promise<any[]>;
  parseFile(colors: any[]): Promise<any>;
  getFigmaFile(): Promise<any>;
  getStylePage(figmaFile: any): Promise<any>;
  returnLatestTokens(): Promise<any | null>;
  manageVersion(file: any): Promise<void>;
}
