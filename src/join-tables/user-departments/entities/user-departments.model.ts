import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../../user/entities/user.model';
import { Department } from '../../../department/entities/department.model';

interface UserDepartmentsCreationAttrs {
  user_id: number;
  department_id: number;
}
@Table({ tableName: 'user_departments' })
export class UserDepartments extends Model<
  UserDepartments,
  UserDepartmentsCreationAttrs
> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  users: User;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.BIGINT,
    field: 'department_id',
  })
  departmentId: number;

  @BelongsTo(() => Department, { onDelete: 'CASCADE' })
  departments: Department;
}
