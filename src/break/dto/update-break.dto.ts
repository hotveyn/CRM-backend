import {
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateBreakDto {
  @ValidateIf((o) => !o.department_id)
  @IsDefined()
  @IsString()
  name: string;

  @ValidateIf((o) => !o.name)
  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  department_id: number;
}
