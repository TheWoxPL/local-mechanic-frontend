export class CreateCompanyDTO {
  companyName!: string;
  description?: string;
  foundDate!: Date;
  owners?: string;
  verifiedOwners!: string[];
  workingHours?: {
    from: number;
    to: number;
  };
  phoneNumber?: string;
}
