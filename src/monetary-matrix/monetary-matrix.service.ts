import { Injectable } from '@nestjs/common';
import { CreateMonetaryMatrixDto } from './dto/create-monetary-matrix.dto';
import { UpdateMonetaryMatrixDto } from './dto/update-monetary-matrix.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MonetaryMatrix } from './entities/monetary-matrix.entity';
import { OrderType } from '../order-type/entities/order-type.entity';
import { Department } from '../department/entities/department.model';
import { BulkUpdateMonetaryMatrixDto } from './dto/bulk-update-monetary-matrix.dto';

@Injectable()
export class MonetaryMatrixService {
  constructor(
    @InjectModel(MonetaryMatrix)
    private readonly MonetaryMatrixModel: typeof MonetaryMatrix,
    @InjectModel(OrderType)
    private readonly OrderTypeModel: typeof OrderType,
  ) {}
  create(createMonetaryMatrixDto: CreateMonetaryMatrixDto) {
    return this.MonetaryMatrixModel.create(createMonetaryMatrixDto);
  }

  async findAll() {
    return await this.MonetaryMatrixModel.findAll({});
  }

  async findSerializedToTable() {
    const orderTypes = await this.OrderTypeModel.findAll();

    const matricesByOrderTypes = await Promise.all(
      orderTypes.map((i) => {
        return this.MonetaryMatrixModel.findAll({
          where: { order_type_id: i.id },
          include: [
            { model: OrderType, attributes: ['name', 'id'] },
            { model: Department, attributes: ['name', 'id'] },
          ],
        });
      }),
    );
    const res = matricesByOrderTypes.map((i) => {
      const serData = { order_type: i[0].order_type, sum: 0 };
      i.forEach((j) => {
        serData[j.department_id] = j;
        serData.sum += j.percent;
      });

      return serData;
    });
    return res;
  }

  async findOne(order_type_id: number, department_id: number) {
    return await this.MonetaryMatrixModel.findOne({
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

  async bulkUpdate(bulkUpdateMonetaryMatrixDto: BulkUpdateMonetaryMatrixDto) {
    return await Promise.all(
      bulkUpdateMonetaryMatrixDto.matrices.map((i) => {
        this.MonetaryMatrixModel.update(
          { percent: i.percent },
          {
            where: {
              order_type_id: i.order_type_id,
              department_id: i.department_id,
            },
          },
        );
      }),
    );
  }

  remove(id: number) {
    return this.MonetaryMatrixModel.destroy({ where: { id } });
  }
}
