import { BaseDto } from './base.dto';

export class CompanyDTO extends BaseDto {
  companyName!: string;
  description?: string;
  foundDate!: Date;
  owners?: string;
  verifiedOwners!: string[];
  workingHours?: {
    from: number;
    to: number;
  };
  imageUrl?: string;
  phoneNumber?: string;
}
