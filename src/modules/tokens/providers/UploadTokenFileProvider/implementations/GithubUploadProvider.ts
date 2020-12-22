// import axios from 'axios';
import IUploadTokenFileProvider from '../models/IUploadTokenFileProvider';

export default class GithubUploadProvider implements IUploadTokenFileProvider {
  public async upload(): Promise<void> {
    try {
      // console.log(tokens);
      // TODO: NOT WORKING
      // axios.post(
      //   'https://api.github.com/repo/MaNikkel/token-generator/dispatches',
      //   {
      //     event_type: 'update-tokens',
      //     client_payload: {
      //       tokenFileName: 'latest.json',
      //       tokens,
      //     },
      //   },
      //   {
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //       accept: 'application/vnd.github.v3+json',
      //     },
      //   },
      // );
    } catch (e) {
      // console.log(e);
      throw new Error(e.message);
    }
  }
}
