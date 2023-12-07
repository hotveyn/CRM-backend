import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OrderType } from '../../order-type/entities/order-type.entity';
import { Department } from '../../department/entities/department.model';

interface IMonetaryMatrix {
  percent: number;
  order_type_id: number;
  department_id: number;
  order_type: OrderType;
  department: Department;
}

type required = Pick<
  IMonetaryMatrix,
  'percent' | 'order_type_id' | 'department_id'
>;

export interface IMonetaryMatrixCreationAttrs extends required {}

@Table({ tableName: 'monetary_matrices' })
export class MonetaryMatrix extends Model<
  MonetaryMatrix,
  IMonetaryMatrixCreationAttrs
> {
  @AllowNull(false)
  @Column({
    field: 'percent',
    type: DataType.REAL,
  })
  percent: number;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => OrderType)
  @Column({
    type: DataType.BIGINT,
    field: 'order_type_id',
  })
  order_type_id: number;

  @BelongsTo(() => OrderType, {
    onDelete: 'CASCADE',
    foreignKey: 'order_type_id',
  })
  order_type: OrderType;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => OrderType)
  @Column({
    type: DataType.BIGINT,
    field: 'department_id',
  })
  department_id: number;

  @BelongsTo(() => OrderType, {
    onDelete: 'CASCADE',
    foreignKey: 'department_id',
  })
  department: Department;
}
