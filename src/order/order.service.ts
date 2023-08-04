import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { IOrderCreationAttrs, Order } from './entities/order.model';
import { OrderStatusEnum } from './types/order-status.enum';
import { ToWorkDto } from './dto/to-work.dto';
import { OrderStageService } from '../order-stage/order-stage.service';
import { OrderStage } from '../order-stage/entities/order-stage.model';
import { ReclamationService } from '../reclamation/reclamation.service';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    private readonly orderStageService: OrderStageService,
    private readonly userService: UserService,
    private readonly reclamationService: ReclamationService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    if (
      await this.orderModel.findOne({ where: { code: createOrderDto.code } })
    ) {
      throw new HttpException('Order with this code already exists', 400);
    }

    const payload: IOrderCreationAttrs = {
      code: createOrderDto.code,
      name: createOrderDto.name,
      date_start: createOrderDto.date_start,
      date_end: createOrderDto.date_end,
      comment: createOrderDto.comment,
      neon_length: createOrderDto.neon_length,
      type: createOrderDto.type,
      status: OrderStatusEnum.NEW,
    };
    if (createOrderDto.reclamation) {
      const reclamation = await this.reclamationService.create(
        createOrderDto.reclamation,
      );
      payload['reclamation_id'] = reclamation.id;
    }
    return await this.orderModel.create(payload);
  }

  async findAllStop() {
    return await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.STOP,
      },
    });
  }
  async findAll() {
    return await this.orderModel.findAll();
  }
  async findAllBreak() {
    return await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.BREAK,
      },
    });
  }
  async findAllNew() {
    return await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.NEW,
      },
    });
  }

  async setWork(id: number, inWorkDto: ToWorkDto) {
    const order = await this.orderModel.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new HttpException('Order does not exist', 400);
    }
    if (order.status !== OrderStatusEnum.NEW) {
      throw new HttpException('Order is not new', 400);
    }

    order.status = OrderStatusEnum.IN_WORK;
    await order.save();
    const orderStages: OrderStage[] = [];

    for (const department_id of inWorkDto.departments) {
      const index: number = inWorkDto.departments.indexOf(department_id);
      const orderStage = await this.orderStageService.create({
        order_id: id,
        department_id: department_id,
        in_order: index + 1,
      });
      if (index + 1 === 1) {
        orderStage.is_active = true;
        await orderStage.save();
      }
      orderStages.push(orderStage);
    }

    return { ...order.dataValues, stages: orderStages };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new HttpException('Order does not exist', 400);
    }

    await order.update(updateOrderDto);
    if (updateOrderDto.departments) {
      for (const orderStage of await this.orderStageService.findAllByOrderId(
        id,
      )) {
        await orderStage.destroy();
      }

      for (const department_id of updateOrderDto.departments) {
        const index: number = updateOrderDto.departments.indexOf(department_id);
        const orderStage = await this.orderStageService.create({
          order_id: id,
          department_id: department_id,
          in_order: index + 1,
        });
        if (index + 1 === 1) {
          orderStage.is_active = true;
          await orderStage.save();
        }
      }
    }

    return {
      ...order.dataValues,
      order_stages: await this.orderStageService.findAllByOrderId(id),
    };
  }

  async findAllCompleted() {
    return await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.COMPLETED,
      },
      include: [OrderStage],
    });
  }

  //TODO: доделать
  async findAllCompletedByDepartment(department_id: number) {
    return await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.COMPLETED,
      },
    });
  }

  async info(id: number) {
    const order = await this.orderModel.findOne({
      where: {
        id,
      },
      include: [OrderStage],
    });
    return order;
  }

  async remove(id: number) {
    return await this.orderModel.destroy({
      where: {
        id,
      },
    });
  }

  async setRating(id: number, rating: number) {
    const order = await this.orderModel.findOne({
      where: {
        id,
      },
    });
    order.rating = rating;
    await order.save();
    return order;
  }

  async findAllInWork() {
    return await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.IN_WORK,
      },
    });
  }

  setStop(id: number) {
    return this.orderModel.update(
      { status: OrderStatusEnum.STOP },
      { where: { id } },
    );
  }

  setComplete(id: number) {
    return this.orderModel.update(
      { status: OrderStatusEnum.COMPLETED },
      { where: { id } },
    );
  }
}
