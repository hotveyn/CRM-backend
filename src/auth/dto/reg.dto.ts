import {
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { UserRoleEnum } from '../../user/types/user-role.enum';

export class RegDto {
  @IsDefined()
  @IsString()
  login: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  first_name: string;

  @IsDefined()
  @IsString()
  last_name: string;

  @IsDefined()
  @IsString()
  patronymic_name: string;

  @IsDefined()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsDateString()
  start_work_date: string;

  @IsString()
  code?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @IsPositive({ each: true })
  departments?: number[];
}
