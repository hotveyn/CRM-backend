import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDepartments } from './entities/user-departments.model';

@Module({
  imports: [SequelizeModule.forFeature([UserDepartments])],
})
export class UserDepartmentsModule {}
