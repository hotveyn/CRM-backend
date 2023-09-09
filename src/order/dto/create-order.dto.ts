import {
  IsDefined,
  IsEnum,
  IsString,
  IsNumber,
  IsDateString,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { OrderTypeEnum } from '../types/order-type.enum';
import { IOrderCreationAttrs } from '../entities/order.model';

export class CreateOrderDto
  implements Omit<IOrderCreationAttrs, 'status' | 'code' | 'status_date'>
{
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsDateString()
  date_start: string;

  @IsDefined()
  @IsDateString()
  date_end: string;

  @IsString()
  comment: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  neon_length: number;

  @IsDefined()
  @IsEnum(OrderTypeEnum)
  type: OrderTypeEnum;

  @IsString()
  reclamation_number: string;
}
