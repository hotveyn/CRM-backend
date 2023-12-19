import { IsDefined, IsString } from 'class-validator';
import { OrderTypeCreationAttrs } from '../entities/order-type.entity';

interface ICreateOrderTypeDtoRequired
  extends NonNullable<OrderTypeCreationAttrs> {}
interface ICreateOrderTypeDtoOptional
  extends Partial<
    Omit<OrderTypeCreationAttrs, keyof ICreateOrderTypeDtoRequired>
  > {}

export class CreateOrderTypeDto
  implements ICreateOrderTypeDtoRequired, ICreateOrderTypeDtoOptional
{
  @IsString()
  @IsDefined()
  name: string;
}
