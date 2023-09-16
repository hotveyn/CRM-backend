import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Max,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OrderStage } from '../../order-stage/entities/order-stage.model';
import { OrderTypeEnum } from '../types/order-type.enum';
import { OrderStatusEnum } from '../types/order-status.enum';
import { Break } from '../../break/entities/break.model';
import { User } from '../../user/entities/user.model';

export interface IOrderCreationAttrs {
  name: string;
  code?: string;
  date_start: string;
  date_end: string;
  neon_length: number;
  status_date: string;
  reclamation_number?: string;
  comment?: string;
  type: OrderTypeEnum;
  status: OrderStatusEnum;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, IOrderCreationAttrs> {
  @Column
  name: string;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  date_start: string;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  date_end: string;

  @Column(DataTypes.TEXT)
  comment: string;

  @Column(DataTypes.ENUM('НЕОН 2', 'НЕОН 2 улица', 'СМАРТ неон', 'НЕОН 1'))
  type: OrderTypeEnum;

  @AllowNull(false)
  @Default(1)
  @Column(DataTypes.REAL)
  neon_length: number;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  status_date: string;

  @AllowNull(false)
  @Default(OrderStatusEnum.NEW)
  @Column(DataTypes.ENUM('Новый', 'В работе', 'Брак', 'Готов', 'Приостановлен'))
  status: OrderStatusEnum;

  @AllowNull(true)
  @Column
  code: string;

  @Max(10)
  @Min(0)
  @Default(0)
  @Column({ type: DataTypes.INTEGER, field: 'rating' })
  rating: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'break_id',
  })
  manager_id: number;

  @AllowNull(true)
  @Column({ type: DataTypes.STRING, field: 'reclamation_number' })
  reclamation_number: string;

  @HasMany(() => OrderStage, { onDelete: 'CASCADE' })
  order_stages: OrderStage[];
}
