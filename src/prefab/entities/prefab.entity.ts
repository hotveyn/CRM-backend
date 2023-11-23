import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { IOrderCreationAttrs } from '../../order/entities/order.model';
import { DataTypes } from 'sequelize';
import { OrderType } from '../../order-type/entities/order-type.entity';

export interface IPrefabCreationAttrs
  extends Pick<
    IOrderCreationAttrs,
    'name' | 'code' | 'type_id' | 'comment' | 'price'
  > {
  name: string;
  code?: string;
  type_id: number;
  comment?: string;
  price: number;
}

@Table({ tableName: 'prefab' })
export class Prefab extends Model<Prefab, IPrefabCreationAttrs> {
  @AllowNull(false)
  @Column
  name: string;

  @Column
  code?: string;

  @Column(DataTypes.TEXT)
  comment: string;

  @AllowNull(false)
  @Min(0)
  @Default(0)
  @Column({
    type: DataType.REAL,
    field: 'price',
  })
  price: number;

  @ForeignKey(() => OrderType)
  @Column({
    type: DataType.BIGINT,
    field: 'type_id',
  })
  type_id: number;

  @BelongsTo(() => OrderType, { onDelete: 'SET NULL' })
  type: number;
}
