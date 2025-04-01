import {
  CompanyDTO,
  CurrencyDTO,
  ServiceAvailabilityDTO,
  ServiceUnitDTO,
  TimeUnitDTO,
} from 'src/shared/dtos';

export interface YourOfferProps {
  uuid: string;
  img: string;
  name: string;
  company: CompanyDTO;
  location: string;
  price: string;
  currency: CurrencyDTO;
  serviceUnit: ServiceUnitDTO;
  rating: number;
  countOpinions: number;
  distance: string;
  estimatedTime: string;
  timeUnit: TimeUnitDTO;
  serviceAvailability: ServiceAvailabilityDTO;
  orders: number;
  views: number;
  favourites: number;
}
