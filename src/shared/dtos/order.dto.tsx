import { ServiceDTO } from './service.dto';

export class OrderDto {
  id!: string;

  userId!: string;

  service!: ServiceDTO;

  scheduledDate!: Date;

  notes?: string;

  price!: number;
}
