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
  @Column(DataTypes.DATEONLY)
  date_start: string;

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
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
  @Column(DataTypes.DATEONLY)
  status_date: string;

  @AllowNull(false)
  @Default(OrderStatusEnum.NEW)
  @Column(DataTypes.ENUM('Новый', 'В работе', 'Брак', 'Готов', 'Приостановлен'))
  status: OrderStatusEnum;

  @Column
  code: string;

  @Column
  enough_resources: boolean;

  @Max(10)
  @Min(0)
  @Default(0)
  @Column({ type: DataTypes.INTEGER, field: 'rating' })
  rating: number;

  @Column({ type: DataTypes.STRING, field: 'reclamation_number' })
  reclamation_number: string;

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
