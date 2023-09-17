import {
  AllowNull,
  BelongsToMany,
  Column,
  Default,
  HasMany,
  IsDate,
  IsUUID,
  Length,
  Model,
  NotEmpty,
  Table,
  Unique,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UserRoleEnum } from '../types/user-role.enum';
import { UserDepartments } from '../../join-tables/user-departments/entities/user-departments.model';
import { Department } from '../../department/entities/department.model';
import { OrderStage } from '../../order-stage/entities/order-stage.model';
import { Exclude } from 'class-transformer';
import { Order } from '../../order/entities/order.model';

interface UserCreationAttrs {
  login: string;
  password: string;
  code?: string;
  first_name: string;
  last_name: string;
  patronymic_name: string;
  start_work_date: string;
  role?: UserRoleEnum;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Unique
  @AllowNull(false)
  @Column
  login: string;

  @Exclude()
  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  first_name: string;

  @Unique
  @Column
  code: string;

  @AllowNull(false)
  @Column
  last_name: string;

  @AllowNull(false)
  @Column
  patronymic_name: string;

  @AllowNull(false)
  @Column(DataTypes.ENUM('admin', 'manager', 'employee', 'fired', 'storage'))
  role: UserRoleEnum;

  @IsDate
  @Column(DataTypes.DATE)
  start_work_date: string;

  @HasMany(() => UserDepartments, { onDelete: 'CASCADE' })
  userDepartments: UserDepartments[];

  @BelongsToMany(() => Department, () => UserDepartments)
  departments: Array<Department & { UserDepartments: UserDepartments }>;

  @HasMany(() => OrderStage, { onDelete: 'SET NULL' })
  orderStages: OrderStage[];

  @HasMany(() => Order, 'manager_id')
  managed_orders: Order[];

  @HasMany(() => Order, 'storage_id')
  storeged_orders: Order[];
}
