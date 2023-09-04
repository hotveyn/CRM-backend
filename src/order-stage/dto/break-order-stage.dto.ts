import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class BreakOrderStageDto {
  @IsDefined()
  @IsNumber()
  @IsPositive()
  break_id: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  department_id: number;
}
