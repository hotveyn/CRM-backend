import { Module } from '@nestjs/common';
import { MonetaryMatrixService } from './monetary-matrix.service';
import { MonetaryMatrixController } from './monetary-matrix.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MonetaryMatrix } from './entities/monetary-matrix.entity';

@Module({
  imports: [SequelizeModule.forFeature([MonetaryMatrix])],
  controllers: [MonetaryMatrixController],
  providers: [MonetaryMatrixService],
})
export class MonetaryMatrixModule {}
