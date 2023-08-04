import { Module } from '@nestjs/common';
import { ReclamationService } from './reclamation.service';
import { ReclamationController } from './reclamation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reclamation } from './entities/reclamation.model';

@Module({
  imports: [SequelizeModule.forFeature([Reclamation])],
  controllers: [ReclamationController],
  providers: [ReclamationService],
  exports: [ReclamationService],
})
export class ReclamationModule {}
