import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/entities/order.model';

interface OrderTypeCreationAttrs {
  name: string;
}

@Table({ tableName: 'order_type' })
export class OrderType extends Model<OrderType, OrderTypeCreationAttrs> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Order)
  orders: Order[];
}
