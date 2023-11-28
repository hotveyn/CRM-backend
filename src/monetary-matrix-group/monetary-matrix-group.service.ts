import { Injectable } from '@nestjs/common';
import { CreateMonetaryMatrixGroupDto } from './dto/create-monetary-matrix-group.dto';
import { UpdateMonetaryMatrixGroupDto } from './dto/update-monetary-matrix-group.dto';

@Injectable()
export class MonetaryMatrixGroupService {
  create(createMonetaryMatrixGroupDto: CreateMonetaryMatrixGroupDto) {
    return 'This action adds a new monetaryMatrixGroup';
  }

  findAll() {
    return `This action returns all monetaryMatrixGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monetaryMatrixGroup`;
  }

  update(id: number, updateMonetaryMatrixGroupDto: UpdateMonetaryMatrixGroupDto) {
    return `This action updates a #${id} monetaryMatrixGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} monetaryMatrixGroup`;
  }
}
