import { IsDefined, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBreakDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  department_id: number;
}
