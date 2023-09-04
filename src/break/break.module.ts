import { Module } from '@nestjs/common';
import { BreakService } from './break.service';
import { BreakController } from './break.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Break } from './entities/break.model';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Break])],
  controllers: [BreakController],
  providers: [BreakService],
  exports: [BreakService],
})
export class BreakModule {}
