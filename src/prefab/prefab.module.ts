import { Module } from '@nestjs/common';
import { PrefabService } from './prefab.service';
import { PrefabController } from './prefab.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prefab } from './entities/prefab.entity';

@Module({
  imports: [SequelizeModule.forFeature([Prefab])],
  controllers: [PrefabController],
  providers: [PrefabService],
})
export class PrefabModule {}
