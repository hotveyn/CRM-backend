import {
  AllowNull,
  BelongsTo,
  Column,
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
import { Reclamation } from '../../reclamation/entities/reclamation.model';

export interface IOrderCreationAttrs {
  name: string;
  code: string;
  date_start: string;
  date_end: string;
  neon_length: number;
  reclamation_id?: number;
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

  @AllowNull(false)
  @Column(DataTypes.ENUM('НЕОН 2', 'НЕОН 2 улица', 'СМАРТ неон', 'НЕОН 1'))
  type: OrderTypeEnum;

  @AllowNull(false)
  @Column
  neon_length: number;

  @AllowNull(false)
  @Column(DataTypes.ENUM('Новый', 'В работе', 'Брак', 'Готов', 'Приостановлен'))
  status: OrderStatusEnum;

  @AllowNull(false)
  @Column
  code: string;

  @AllowNull(true)
  @ForeignKey(() => Reclamation)
  @Column({ type: DataTypes.BIGINT, field: 'reclamation_id' })
  reclamation_id: number;

  @BelongsTo(() => Reclamation)
  reclamation: Reclamation;

  @Max(10)
  @Min(0)
  @Default(0)
  @Column({ type: DataTypes.INTEGER, field: 'rating' })
  rating: number;

  @HasMany(() => OrderStage, { onDelete: 'CASCADE' })
  order_stages: OrderStage[];
}
