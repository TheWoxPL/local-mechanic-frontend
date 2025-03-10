
import { BasicDto } from './basic.dto';

export class BaseDto extends BasicDto {
  createdAt?: Date;
  updatedAt!: Date;
  createdBy?: string;
  updatedBy!: string;
}