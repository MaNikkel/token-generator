import axios from 'axios';
import IUploadTokenFileProvider from '../models/IUploadTokenFileProvider';
// 5374a2bbd78ed434edee97484209e5ab82019cf8
export default class GithubUploadProvider implements IUploadTokenFileProvider {
  public async upload(tokens: any): Promise<void> {
    console.log(tokens);
    try {
      axios.post(
        'https://api.github.com/repo/MaNikkel/token-generator/dispatches',
        {
          event_type: 'update-tokens',
          client_payload: {
            tokenFileName: 'latest.json',
            tokens,
          },
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            accept: 'application/vnd.github.v3+json',
            Authorization: `token 5374a2bbd78ed434edee97484209e5ab82019cf8`,
          },
        },
      );
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  }
}
