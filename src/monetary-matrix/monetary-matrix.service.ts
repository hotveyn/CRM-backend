import { Injectable } from '@nestjs/common';
import { CreateMonetaryMatrixDto } from './dto/create-monetary-matrix.dto';
import { UpdateMonetaryMatrixDto } from './dto/update-monetary-matrix.dto';

@Injectable()
export class MonetaryMatrixService {
  create(createMonetaryMatrixDto: CreateMonetaryMatrixDto) {
    return 'This action adds a new monetaryMatrix';
  }

  findAll() {
    return `This action returns all monetaryMatrix`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monetaryMatrix`;
  }

  update(id: number, updateMonetaryMatrixDto: UpdateMonetaryMatrixDto) {
    return `This action updates a #${id} monetaryMatrix`;
  }

  remove(id: number) {
    return `This action removes a #${id} monetaryMatrix`;
  }
}
