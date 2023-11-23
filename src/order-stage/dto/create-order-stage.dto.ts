import { IsBoolean, IsDefined, IsNumber } from 'class-validator';

export class CreateOrderStageDto {
  @IsNumber()
  @IsDefined()
  order_id: number;

  @IsNumber()
  @IsDefined()
  department_id: number;

  @IsNumber()
  @IsDefined()
  price_percent: number;

  @IsNumber()
  @IsDefined()
  in_order: number;

  @IsNumber()
  break_id?: number;

  @IsNumber()
  user_id?: number;

  @IsBoolean()
  is_active?: boolean;
}
