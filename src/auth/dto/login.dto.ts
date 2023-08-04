import { IsDefined } from 'class-validator';

export class LoginDto {
  @IsDefined()
  login: string;

  @IsDefined()
  password: string;
}
