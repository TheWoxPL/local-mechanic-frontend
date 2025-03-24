import { callApi } from '../../utils/callApi';
// import DtoMapping from '../../utils/dtoMapping';
import { ResponseTokenDTO, CreateCompanyDTO, CompanyDTO } from '../dtos';
// import { CompanyDTO } from '../dtos/company.dto';

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
    async getRoles(): Promise<string[]> {
      const response = await callApi<ResponseTokenDTO>(
        '/auth/verify-token',
        'POST'
      );
      return response.data.roles;
    },
  };

  static companies = {
    async addCompany(createCompanyDTO: CreateCompanyDTO): Promise<unknown> {
      const response = await callApi(
        '/companies/add-company',
        'POST',
        createCompanyDTO
      );
      return response.data;
    },
    async getUserCompanies(): Promise<CompanyDTO[]> {
      const response = await callApi<CompanyDTO[]>(
        '/companies/get-user-companies',
        'GET'
      );
      return response.data;
    },
  };
}

export default ApiUtils;
