import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.model';
import { OrderStageModule } from '../order-stage/order-stage.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { BreakModule } from '../break/break.module';
import { DepartmentModule } from '../department/department.module';
import { MonetaryMatrix } from '../monetary-matrix/entities/monetary-matrix.entity';
import { Prefab } from '../prefab/entities/prefab.entity';
import { ordersProcedures } from './procedures';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, MonetaryMatrix, Prefab]),
    OrderStageModule,
    DepartmentModule,
    UserModule,
    AuthModule,
    BreakModule,
    PrismaModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ...ordersProcedures],
  exports: [OrderService],
})
export class OrderModule {}
