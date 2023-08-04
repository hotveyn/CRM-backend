import { UserRoleEnum } from '../types/user-role.enum';

export class CreateUserDto {
  login: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic_name: string;
  role: UserRoleEnum;
}
