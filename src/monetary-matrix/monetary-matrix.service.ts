import { Injectable } from '@nestjs/common';
import { CreateMonetaryMatrixDto } from './dto/create-monetary-matrix.dto';
import { UpdateMonetaryMatrixDto } from './dto/update-monetary-matrix.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MonetaryMatrix } from './entities/monetary-matrix.entity';

@Injectable()
export class MonetaryMatrixService {
  constructor(
    @InjectModel(MonetaryMatrix)
    private readonly MonetaryMatrixModel: typeof MonetaryMatrix,
  ) {}
  create(createMonetaryMatrixDto: CreateMonetaryMatrixDto) {
    return this.MonetaryMatrixModel.create(createMonetaryMatrixDto);
  }

  findAll() {
    return this.MonetaryMatrixModel.findAll();
  }

  findOne(order_type_id: number, department_id: number) {
    return this.MonetaryMatrixModel.findOne({
      where: { order_type_id, department_id },
    });
  }

  update(
    order_type_id: number,
    department_id: number,
    updateMonetaryMatrixDto: UpdateMonetaryMatrixDto,
  ) {
    return this.MonetaryMatrixModel.update(updateMonetaryMatrixDto, {
      where: { order_type_id, department_id },
    });
  }

  remove(id: number) {
    return this.MonetaryMatrixModel.destroy({ where: { id } });
  }
}
