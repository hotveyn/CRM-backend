import {
  AllowNull,
  BelongsTo,
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
import { OrderStatusEnum } from '../types/order-status.enum';
import { User } from '../../user/entities/user.model';
import { OrderType } from '../../order-type/entities/order-type.entity';

export interface IOrderCreationAttrs {
  name: string;
  code?: string;
  date_start: string;
  date_end: string;
  neon_length?: number;
  price: number;
  status_date: string;
  reclamation_number?: string;
  comment?: string;
  type_id: number;
  status: OrderStatusEnum;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, IOrderCreationAttrs> {
  @Column
  name: string;

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
  date_start: string;

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
  date_end: string;

  @Column(DataTypes.TEXT)
  comment: string;

  @AllowNull(true)
  @Default(0)
  @Column(DataTypes.REAL)
  neon_length: number;

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
  status_date: string;

  @AllowNull(false)
  @Default(OrderStatusEnum.NEW)
  @Column(DataTypes.ENUM('Новый', 'В работе', 'Брак', 'Готов', 'Приостановлен'))
  status: OrderStatusEnum;

  @Column
  code: string;

  @AllowNull(false)
  @Min(0)
  @Default(0)
  @Column({
    type: DataType.REAL,
    field: 'price',
  })
  price: number;

  @Column
  enough_resources: boolean;

  @Max(10)
  @Min(0)
  @Default(0)
  @Column({ type: DataTypes.INTEGER, field: 'rating' })
  rating: number;

  @Column({ type: DataTypes.STRING, field: 'reclamation_number' })
  reclamation_number: string;

  @ForeignKey(() => OrderType)
  @Column({
    type: DataType.BIGINT,
    field: 'type_id',
  })
  type_id: number;

  @BelongsTo(() => OrderType, { onDelete: 'SET NULL' })
  type: number;

  @HasMany(() => OrderStage, { onDelete: 'CASCADE' })
  order_stages: OrderStage[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'storage_id',
  })
  storage_id: number;

  @BelongsTo(() => User)
  storage: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'manager_id',
  })
  manager_id: number;

  @BelongsTo(() => User)
  manager: User;
}
