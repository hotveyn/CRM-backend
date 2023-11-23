import {
  IsDefined,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class ToWorkDto {
  @IsDefined()
  @ValidateNested()
  departments: ToWorkDepartment[];
}

class ToWorkDepartment {
  @IsDefined()
  @IsNumber({ allowNaN: false })
  @IsPositive()
  department_id: number;

  @IsDefined()
  @IsNumber({ allowNaN: false })
  price_percent: number;
}
