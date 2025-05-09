import { AvailableSlot } from 'src/types/AvailableSlot';
import { callApi } from '../../utils/callApi';
// import DtoMapping from '../../utils/dtoMapping';
import {
  ResponseTokenDTO,
  CreateCompanyDTO,
  CompanyDTO,
  CurrencyDTO,
  ServiceUnitDTO,
  ServiceAvailabilityDTO,
  TimeUnitDTO,
  ServiceDTO,
  CreateServiceDTO,
} from '../dtos';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDto } from '../dtos/order.dto';
// import { CompanyDTO } from '../dtos/company.dto';

class ApiUtils {
  static default = {
    async helloWorld(): Promise<ResponseTokenDTO> {
      const response = await callApi('/', 'GET');
      return new ResponseTokenDTO(response.data);
    },
  };
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
    async addCompany(createCompanyDTO: CreateCompanyDTO): Promise<CompanyDTO> {
      const response = await callApi<CompanyDTO>(
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

    async getCompanyById(uuid: string): Promise<CompanyDTO> {
      const response = await callApi<CompanyDTO>(
        '/companies/get-company/' + uuid,
        'GET'
      );
      return response.data;
    },
  };
  static staticData = {
    async getCurrencies(): Promise<CurrencyDTO[]> {
      const response = await callApi<CurrencyDTO[]>(
        '/static-data/get-currencies',
        'GET'
      );
      return response.data;
    },
    async getServiceUnits(): Promise<ServiceUnitDTO[]> {
      const response = await callApi<ServiceUnitDTO[]>(
        '/static-data/get-service-units',
        'GET'
      );
      return response.data;
    },
    async getServiceAvailabilities(): Promise<ServiceAvailabilityDTO[]> {
      const response = await callApi<ServiceAvailabilityDTO[]>(
        '/static-data/get-service-availabilities',
        'GET'
      );
      return response.data;
    },
    async getTimeUnits(): Promise<TimeUnitDTO[]> {
      const response = await callApi<TimeUnitDTO[]>(
        '/static-data/get-time-units',
        'GET'
      );
      return response.data;
    },
  };
  static services = {
    async getAllServicesByCompanyId(companyId): Promise<ServiceDTO[]> {
      const response = await callApi<ServiceDTO[]>(
        '/services/get-services/' + companyId,
        'GET'
      );
      return response.data;
    },
    async getServiceById(serviceId): Promise<ServiceDTO> {
      const response = await callApi<ServiceDTO>(
        '/services/get-service-by-id/' + serviceId,
        'GET'
      );
      return response.data;
    },
    async addService(
      createServiceDTO: CreateServiceDTO | FormData
    ): Promise<ServiceDTO> {
      const response = await callApi<ServiceDTO>(
        '/services/add-service',
        'POST',
        createServiceDTO
      );
      return response.data;
    },
    async deleteServiceById(serviceId: string): Promise<unknown> {
      const response = await callApi('/services/' + serviceId, 'DELETE');
      return response.data;
    },
    async generateServicesForUser(): Promise<ServiceDTO[]> {
      const response = await callApi<ServiceDTO[]>(
        '/services/generate-services-for-user/',
        'GET'
      );
      return response.data;
    },
    async getFavoritesForUser(): Promise<ServiceDTO[]> {
      const response = await callApi<ServiceDTO[]>(
        '/services/get-favorite-services-for-user/',
        'GET'
      );
      return response.data;
    },
    async uploadServiceImage(formData: FormData): Promise<unknown> {
      const response = await callApi(
        '/services/upload-image-to-service',
        'POST',
        formData
      );
      return response.data;
    },

    async getAvailableSlots(serviceId: string): Promise<AvailableSlot[]> {
      const response = await callApi<AvailableSlot[]>(
        `/services/${serviceId}/available-slots`,
        'GET'
      );
      return response.data;
    },
  };

  static orders = {
    async addOrder(createOrderDTO: CreateOrderDto): Promise<void> {
      const response = await callApi<void>(
        '/orders/add-order/',
        'POST',
        createOrderDTO
      );
      return response.data;
    },
    async getUserOrders(): Promise<OrderDto[]> {
      const response = await callApi<OrderDto[]>(
        '/orders/get-user-orders/',
        'GET'
      );
      return response.data;
    },
    async resignOrder(orderId: string): Promise<void> {
      const response = await callApi<void>(
        `/orders/resign-order/${orderId}`,
        'DELETE'
      );
      return response.data;
    },
  };

  static favorites = {
    async addServiceToFavorites(serviceId: string): Promise<unknown> {
      const response = await callApi<unknown>(
        '/favorites/add-to-favorites/',
        'POST',
        { serviceId }
      );
      return response.data;
    },
    async removeServiceFromFavorites(serviceId: string): Promise<unknown> {
      const response = await callApi<unknown>(
        '/favorites/remove-from-favorites/',
        'DELETE',
        { serviceId }
      );
      return response.data;
    },
    async isServiceFavorite(
      serviceId: string
    ): Promise<{ isFavorite: boolean }> {
      const response = await callApi<{ isFavorite: boolean }>(
        '/favorites/is-service-favorite/',
        'POST',
        { serviceId }
      );
      return response.data;
    },
  };
}

export default ApiUtils;
