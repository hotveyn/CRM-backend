import { UserRoleEnum } from '../../user/types/user-role.enum';

export interface IJWTPayload {
  user: {
    login: string;
    id: number;
    iat: string;
    exp: string;
    role: UserRoleEnum;
  };
}
