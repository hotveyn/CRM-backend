import { Module } from '@nestjs/common';
import { MonetaryMatrixGroupService } from './monetary-matrix-group.service';
import { MonetaryMatrixGroupController } from './monetary-matrix-group.controller';

@Module({
  controllers: [MonetaryMatrixGroupController],
  providers: [MonetaryMatrixGroupService]
})
export class MonetaryMatrixGroupModule {}
