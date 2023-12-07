import { Module } from '@nestjs/common';
import { MonetaryMatrixService } from './monetary-matrix.service';
import { MonetaryMatrixController } from './monetary-matrix.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderType } from '../order-type/entities/order-type.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderType])],
  controllers: [MonetaryMatrixController],
  providers: [MonetaryMatrixService],
})
export class MonetaryMatrixModule {}
