import {
  AfterCreate,
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/entities/order.model';
import { MonetaryMatrix } from '../../monetary-matrix/entities/monetary-matrix.entity';
import { Department } from '../../department/entities/department.model';

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

  @HasMany(() => Order, { onDelete: 'SET NULL' })
  orders: Order[];

  @AfterCreate
  static async addMatrixAfterCreate(instance: OrderType) {
    const departments = await Department.findAll();
    await Promise.all(
      departments.map(async (d) => {
        return MonetaryMatrix.create({
          order_type_id: instance.id,
          department_id: d.id,
        });
      }),
    );
  }
}
