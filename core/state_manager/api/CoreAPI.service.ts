import axios from 'axios';
import {HTTP_API_ENDPOINT} from '../constants';

export class CoreAPIService {
  private static _getEndPoint(): string {
    return `${HTTP_API_ENDPOINT}/api/v1`;
  }

  public static post(path: string, data: any) {
    path = `${CoreAPIService._getEndPoint()}/${path}`;
    return axios
      .post(path, data)
      .then(res => res)
      .catch(error => {
        throw new Error(
          CoreAPIService._formatErrorStatusCodes(error.response.status),
        );
      });
  }

  private static _formatErrorStatusCodes(code: number): string {
    switch (code) {
      case 400:
        return 'COULD_NOT_CONNECT_TO_THE_SERVER';
      case 500:
        return 'INTERNAL_SERVER_ERROR_OCCURED';
      default:
        return '';
    }
  }
}
