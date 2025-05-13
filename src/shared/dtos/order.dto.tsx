import { ServiceDTO } from './service.dto';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED';

export class OrderDto {
  id!: string;

  userId!: string;

  service!: ServiceDTO;

  scheduledDate!: Date;

  notes?: string;

  price!: number;

  // Fields needed for company orders display
  status?: OrderStatus;

  customerName?: string;

  serviceName?: string;
}
