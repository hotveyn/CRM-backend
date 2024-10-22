import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderStage } from './entities/order-stage.model';
import { OrderStageService } from './order-stage.service';
import { OrderStageController } from './order-stage.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { DepartmentModule } from '../department/department.module';
import { User } from '../user/entities/user.model';
import { orderStageProcedures } from './procedures';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderStage, User]),
    UserModule,
    AuthModule,
    DepartmentModule,
  ],
  providers: [OrderStageService, ...orderStageProcedures],
  exports: [OrderStageService],
  controllers: [OrderStageController],
})
export class OrderStageModule {}
