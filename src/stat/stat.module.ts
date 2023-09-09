import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.model';
import { AuthModule } from '../auth/auth.module';
import { Department } from '../department/entities/department.model';
import { Order } from '../order/entities/order.model';
import { OrderStage } from '../order-stage/entities/order-stage.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Department, Order, OrderStage]),
    AuthModule,
  ],
  controllers: [StatController],
  providers: [StatService],
})
export class StatModule {}
