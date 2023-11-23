import { Module } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { OrderTypeController } from './order-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderType } from './entities/order-type.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderType])],
  controllers: [OrderTypeController],
  providers: [OrderTypeService],
  exports: [OrderTypeService],
})
export class OrderTypeModule {}
