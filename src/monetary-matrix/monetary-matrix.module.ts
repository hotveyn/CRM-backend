import { Module } from '@nestjs/common';
import { MonetaryMatrixService } from './monetary-matrix.service';
import { MonetaryMatrixController } from './monetary-matrix.controller';

@Module({
  controllers: [MonetaryMatrixController],
  providers: [MonetaryMatrixService]
})
export class MonetaryMatrixModule {}
