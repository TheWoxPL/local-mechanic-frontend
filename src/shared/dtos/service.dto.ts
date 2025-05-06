import {
  BaseDto,
  CompanyDTO,
  CurrencyDTO,
  ServiceAvailabilityDTO,
  ServiceUnitDTO,
  TimeUnitDTO,
} from '../dtos/';

export class ServiceDTO extends BaseDto {
  id!: string;

  title!: string;

  description?: string;

  estimatedTime!: string;

  timeUnit!: TimeUnitDTO;

  serviceAvailability!: ServiceAvailabilityDTO;

  price!: number;

  currency!: CurrencyDTO;

  serviceUnit!: ServiceUnitDTO;

  company!: CompanyDTO;

  isFavorite?: boolean;

  imageUrl?: string;
}
