import {
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  name?: string;

  @IsNumber()
  type_id?: number;

  @IsNumber()
  @IsPositive()
  neon_length?: number;

  @IsNumber()
  price?: number;

  @ValidateNested()
  departments?: ToWorkDepartment[];

  @IsString()
  comment?: string;
}

class ToWorkDepartment {
  @IsDefined()
  @IsNumber({ allowNaN: false })
  @IsPositive()
  department_id: number;

  @IsDefined()
  @IsNumber({ allowNaN: false })
  percent: number;
}
