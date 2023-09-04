import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  patronymic_name: string;

  start_work_date: string;

  @IsString()
  code?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @IsPositive({ each: true })
  departments: number[];
}
