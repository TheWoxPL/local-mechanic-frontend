import { callApi } from '../../utils/callApi';
// import DtoMapping from '../../utils/dtoMapping';
import { ResponseTokenDTO } from '../dtos';

class ApiUtils {
  static auth = {
    async verifyToken(): Promise<ResponseTokenDTO> {
      const response = await callApi('/auth/verify-token', 'POST');
      return new ResponseTokenDTO(response.data);
    },
    async isUserLogged(): Promise<boolean> {
      const response = await callApi('/auth/verify-token', 'POST');
      return response.statusCode === 200 ? true : false;
    },
  };
}

export default ApiUtils;
