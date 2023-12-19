import { Injectable } from '@nestjs/common';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderType } from './entities/order-type.entity';

@Injectable()
export class OrderTypeService {
  constructor(
    @InjectModel(OrderType)
    private readonly orderTypeModel: typeof OrderType,
  ) {}
  async create(dto: CreateOrderTypeDto) {
    return await this.orderTypeModel.create(dto);
  }

  async findAll() {
    return await this.orderTypeModel.findAll();
  }

  async findOne(id: number) {
    return await this.orderTypeModel.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateOrderTypeDto) {
    return await this.orderTypeModel.update(dto, {
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.orderTypeModel.destroy({ where: { id } });
  }
}
