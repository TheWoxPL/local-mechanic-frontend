export class CreateCompanyDTO {
  companyName!: string;
  description?: string;
  foundDate!: Date;
  owners?: string;
  verifiedOwners!: string[];
}
