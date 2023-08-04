import {
  IsDefined,
  IsEnum,
  IsString,
  IsNumber,
  IsDateString,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { OrderTypeEnum } from '../types/order-type.enum';
import { IOrderCreationAttrs } from '../entities/order.model';
import { CreateReclamationDto } from '../../reclamation/dto/create-reclamation.dto';

export class CreateOrderDto
  implements Omit<IOrderCreationAttrs, 'status' | 'reclamation_id'>
{
  @IsDefined()
  @IsString()
  code: string;

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

  @ValidateNested()
  reclamation?: CreateReclamationDto;

  @IsDefined()
  @IsEnum(OrderTypeEnum)
  type: OrderTypeEnum;
}
