/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';
import jsonDiff from 'json-diff';
import rgbHex from 'rgb-hex';
import IGenerateTokenProvider from '../models/IGenerateTokenProvider';
import filePathConfig from '../../../../../config/filePath';

export default class DiskTokensProvider implements IGenerateTokenProvider {
  private figmaApi: string;

  private file: string;

  constructor(figmaApi: string, file: string) {
    this.figmaApi = figmaApi;
    this.file = file;
  }

  public async getFigmaFile(): Promise<AxiosResponse | Error> {
    try {
      const result = await axios.get(
        `https://api.figma.com/v1/files/${this.file}`,
        {
          headers: {
            'X-Figma-Token': this.figmaApi,
          },
        },
      );

      return result;
    } catch (e) {
      // console.log(e);
      throw new Error(e);
    }
  }

  public async manageVersion(parsedFile: any): Promise<void> {
    const stringifiedFile = JSON.stringify(parsedFile);
    fs.readdir(filePathConfig.filesDir, (err, files) => {
      const hasLatest = files.find(f => f === 'latest.json');
      if (hasLatest) {
        fs.readFile(
          path.join(filePathConfig.filesDir, 'latest.json'),
          (_, data) => {
            const currentFile = JSON.parse(data as any);
            const diff = jsonDiff.diffString(currentFile, parsedFile);
            if (diff) {
              fs.rename(
                path.join(filePathConfig.filesDir, 'latest.json'),
                path.join(filePathConfig.filesDir, `v${files.length}.json`),
                () => {
                  fs.writeFileSync(
                    path.join(filePathConfig.filesDir, 'latest.json'),
                    stringifiedFile,
                  );
                },
              );
            }
          },
        );
      } else {
        fs.writeFileSync(
          path.join(filePathConfig.filesDir, 'latest.json'),
          stringifiedFile,
        );
      }
    });
  }

  public async getPallete(stylePage: any): Promise<any[]> {
    const colors = stylePage.children[0].children.map((color: any) => {
      return {
        [color.name]: `#${rgbHex(
          color.fills[0].color.r * 255,
          color.fills[0].color.g * 255,
          color.fills[0].color.b * 255,
        )}`,
      };
    });
    return colors;
  }

  public async parseFile(colors: any[]): Promise<any> {
    return {
      colors: colors.reduce((acc, cur) => ({ ...acc, ...cur })),
    };
  }

  public async getStylePage(figmaFile: any) {
    return figmaFile.data.document.children[1];
  }

  public async returnLatestTokens(): Promise<any | null> {
    const latestPath = path.join(filePathConfig.filesDir, 'latest.json');
    if (fs.existsSync(latestPath)) {
      const file = fs.readFileSync(latestPath);
      const parsedFile = JSON.parse(file as any);
      return parsedFile;
    }
    return null;
  }
}
