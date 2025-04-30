export class CreateOrderDto {
  serviceId!: string;

  scheduledDate!: Date;

  notes?: string;

  price!: number;
}
