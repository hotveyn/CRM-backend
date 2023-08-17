import {
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  IsDate,
} from 'class-validator';

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
  start_work_date: string;

  @IsString()
  code?: string;

  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @IsPositive({ each: true })
  departments: number[];
}
