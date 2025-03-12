import { SystemStatus } from '../enums';
export class ResponseTokenDTO {
  username!: string;
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  roles!: string[];
  status!: SystemStatus.ACTIVE | SystemStatus.INACTIVE;

  constructor(data: unknown) {
    this.username = data['username'];
    this.id = data['id'];
    this.firstName = data['firstName'];
    this.lastName = data['lastName'];
    this.email = data['email'];
    this.roles = data['roles'];
    this.status = data['status'];
  }
}
