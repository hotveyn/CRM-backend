import { IsDefined, IsString, IsNumber, IsDateString } from 'class-validator';
import { IOrderCreationAttrs } from '../entities/order.model';

export class CreateOrderDto
  implements
    Pick<
      IOrderCreationAttrs,
      | 'name'
      | 'date_start'
      | 'date_end'
      | 'comment'
      | 'price'
      | 'neon_length'
      | 'type_id'
      | 'reclamation_number'
    >
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
  price: number;

  @IsNumber()
  neon_length: number;

  @IsDefined()
  @IsNumber()
  type_id: number;

  @IsString()
  reclamation_number: string;
}
