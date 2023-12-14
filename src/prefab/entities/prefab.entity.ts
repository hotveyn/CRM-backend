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
import { DataTypes } from 'sequelize';
import { OrderType } from '../../order-type/entities/order-type.entity';

export interface IPrefab {
  comment: string | null;
  code: string | null;
  type_id: number | null;
  price: number;
  name: string;
  type: OrderType | null;
}

type required = Pick<IPrefab, 'price' | 'name'>;
type optional = Partial<Pick<IPrefab, 'comment' | 'type_id'>>;
export interface IPrefabCreationAttrs extends required, optional {}

@Table({ tableName: 'prefabs' })
export class Prefab
  extends Model<Prefab, IPrefabCreationAttrs>
  implements Omit<IPrefab, 'code'>
{
  @AllowNull(false)
  @Column
  name: string;

  @Column(DataTypes.TEXT)
  comment: string | null;

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
  type_id: number | null;

  @BelongsTo(() => OrderType, { onDelete: 'CASCADE' })
  type: OrderType | null;
}
