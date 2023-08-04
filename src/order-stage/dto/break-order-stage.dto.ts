import { IsDefined, IsNumber, IsPositive, IsString } from 'class-validator';

export class BreakOrderStageDto {
  @IsDefined()
  @IsNumber()
  @IsPositive()
  break_id: number;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  department_id: number;
}
