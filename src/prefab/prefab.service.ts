import { Injectable } from '@nestjs/common';
import { CreatePrefabDto } from './dto/create-prefab.dto';
import { UpdatePrefabDto } from './dto/update-prefab.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Prefab } from './entities/prefab.entity';

@Injectable()
export class PrefabService {
  constructor(
    @InjectModel(Prefab)
    private readonly PrefabModel: Prefab,
  ) {}

  create(createPrefabDto: CreatePrefabDto) {
    return 'This action adds a new prefab';
  }

  findAll() {
    return `This action returns all prefab`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prefab`;
  }

  update(id: number, updatePrefabDto: UpdatePrefabDto) {
    return `This action updates a #${id} prefab`;
  }

  remove(id: number) {
    return `This action removes a #${id} prefab`;
  }
}
