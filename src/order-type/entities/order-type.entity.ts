import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/entities/order.model';

interface IOrderType {
  name: string;
  orders: Order[];
}

interface IOrderTypeCreationAttrsRequired extends Pick<IOrderType, 'name'> {}
export interface OrderTypeCreationAttrs
  extends IOrderTypeCreationAttrsRequired {}

@Table({ tableName: 'order_types' })
export class OrderType
  extends Model<OrderType, OrderTypeCreationAttrs>
  implements IOrderType
{
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Order)
  orders: Order[];
}
