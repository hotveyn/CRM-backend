import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.model';
import { Order } from '../../order/entities/order.model';
import { Department } from '../../department/entities/department.model';
import { Break } from '../../break/entities/break.model';

export interface CreationOrderStageAttrs {
  order_id: number;
  department_id: number;
  break_id?: number;
  user_id?: number;
  in_order: number;
  is_active: boolean;
}
@Table({ tableName: 'order_stages' })
export class OrderStage extends Model<OrderStage, CreationOrderStageAttrs> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => Order)
  @Column({
    type: DataType.BIGINT,
    field: 'order_id',
  })
  order_id: number;

  @BelongsTo(() => Order, { onDelete: 'CASCADE' })
  order: Order;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.BIGINT,
    field: 'department_id',
  })
  department_id: number;

  @BelongsTo(() => Department)
  department?: Department;

  @ForeignKey(() => Break)
  @Column({
    type: DataType.BIGINT,
    field: 'break_id',
  })
  break_id: number;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
    field: 'ready_date',
  })
  ready_date: string;

  @BelongsTo(() => Break)
  break: Break;

  @Default(false)
  @Column({ field: 'is_active' })
  is_active: boolean;

  @AllowNull(false)
  @Column({ field: 'in_order' })
  in_order: number;
}
