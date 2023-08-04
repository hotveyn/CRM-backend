import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './entities/department.model';
import { DepartmentService } from './department.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Department]), AuthModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
