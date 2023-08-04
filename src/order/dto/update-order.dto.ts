import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { OrderTypeEnum } from '../types/order-type.enum';

export class UpdateOrderDto {
  @IsString()
  name?: string;

  @IsEnum(OrderTypeEnum)
  type?: OrderTypeEnum;

  @IsNumber()
  @IsPositive()
  neon_length: number;

  @IsNumber({ allowNaN: false }, { each: true })
  @IsPositive({ each: true })
  departments: number[];

  @IsString()
  comment: string;
}
