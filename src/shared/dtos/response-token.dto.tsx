import { SystemStatus } from '../enums';
export class ResponseTokenDTO {
  username!: string;

  id!: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  roles!: string[];

  status!: SystemStatus.ACTIVE | SystemStatus.INACTIVE;
}
