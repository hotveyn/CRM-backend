import { Module } from '@nestjs/common';
import { MonetaryMatrixService } from './monetary-matrix.service';
import { MonetaryMatrixController } from './monetary-matrix.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MonetaryMatrix } from './entities/monetary-matrix.entity';
import { OrderType } from '../order-type/entities/order-type.entity';
import { Department } from '../department/entities/department.model';

@Module({
  imports: [
    SequelizeModule.forFeature([MonetaryMatrix, OrderType, Department]),
  ],
  controllers: [MonetaryMatrixController],
  providers: [MonetaryMatrixService],
})
export class MonetaryMatrixModule {}
