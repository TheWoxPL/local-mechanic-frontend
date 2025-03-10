import { callApi } from '../../utils/callApi';
// import DtoMapping from '../../utils/dtoMapping';
import { ResponseTokenDTO } from '../dtos';

class ApiUtils {
  static auth = {
    async verifyToken(): Promise<ResponseTokenDTO> {
      return await callApi('/auth/verify-token', 'POST');
    },
  };
}

export default ApiUtils;
