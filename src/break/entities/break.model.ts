import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Department } from '../../department/entities/department.model';
import { OrderStage } from '../../order-stage/entities/order-stage.model';
interface BreakCreationAttrs {
  name: string;
  department_id: number;
}
@Table({ tableName: 'breaks' })
export class Break extends Model<Break, BreakCreationAttrs> {
  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.BIGINT,
    field: 'department_id',
  })
  department_id: number;

  @BelongsTo(() => Department, { onDelete: 'CASCADE' })
  department: Department;

  @HasMany(() => OrderStage)
  orderStages: OrderStage[];
}
