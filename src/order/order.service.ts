import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { IOrderCreationAttrs, Order } from './entities/order.model';
import { OrderStatusEnum } from './types/order-status.enum';
import { ToWorkDto } from './dto/to-work.dto';
import { OrderStageService } from '../order-stage/order-stage.service';
import { OrderStage } from '../order-stage/entities/order-stage.model';
import { UserService } from '../user/user.service';
import { BreakService } from '../break/break.service';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/entities/department.model';
import { IBitrixResponse } from '../bitrix/types/IBitrixResponse';
import { ImportOrderDto } from './dto/import-order.dto';
import { Op } from 'sequelize';
import { User } from '../user/entities/user.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    private readonly orderStageService: OrderStageService,
    private readonly breakService: BreakService,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const payload: IOrderCreationAttrs = {
      name: createOrderDto.name,
      date_start: createOrderDto.date_start,
      date_end: createOrderDto.date_end,
      comment: createOrderDto.comment,
      neon_length: createOrderDto.neon_length,
      type: createOrderDto.type,
      status: OrderStatusEnum.NEW,
      status_date: new Date().toISOString(),
      reclamation_number: createOrderDto.reclamation_number,
    };
    const order = await this.orderModel.create(payload);
    order.code = String(10000 + order.id) + 'M';
    await order.save();
    return order;
  }

  async import(dto: ImportOrderDto) {
    await this.orderModel.create({
      ...dto,
      status_date: new Date().toISOString(),
    });
  }

  async findAll() {
    return await this.orderModel.findAll();
  }

  async findAllInWork() {
    const orders = await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.IN_WORK,
      },
      include: [OrderStage],
    });
    const formattedOrders = [];
    for (const order of orders) {
      // all departments
      const departments: Department[] = [];

      for (const order_stage of order.order_stages) {
        const department = await this.departmentService.findById(
          +order_stage.department_id,
        );

        departments.push(department ? department.dataValues : null);
      }

      // active department
      const orderStageActive = order.order_stages.find(
        (order_stage) => order_stage.is_active,
      );
      const current_department = await this.departmentService.findById(
        +orderStageActive.department_id,
      );

      formattedOrders.push({
        ...order.dataValues,
        current_department,
        departments,
      });
    }
    return formattedOrders;
  }

  async findAllStop() {
    const orders = await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.STOP,
      },
      include: [OrderStage],
    });
    const formattedOrders = [];
    for (const order of orders) {
      const orderStageWithBreak = order.order_stages.find(
        (order_stage) => order_stage.break_id,
      );
      const breakOne = await this.breakService.findOne(
        +orderStageWithBreak.break_id,
      );
      formattedOrders.push({ ...order.dataValues, break: breakOne });
    }
    return formattedOrders;
  }

  async findAllBreak() {
    const orders = await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.BREAK,
      },
      include: [OrderStage],
    });
    const formattedOrders = [];
    for (const order of orders) {
      const orderStageWithBreak = order.order_stages.find(
        (order_stage) => order_stage.break_id,
      );
      const breakOne = await this.breakService.findOne(
        +orderStageWithBreak.break_id,
      );
      formattedOrders.push({ ...order.dataValues, break: breakOne });
    }
    return formattedOrders;
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
      throw new HttpException('Этот заказ не существует', 400);
    }
    if (order.status !== OrderStatusEnum.NEW) {
      throw new HttpException('Заказ уже не новый', 400);
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

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new HttpException('Такой заказ не существует', 400);
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
      include: [{ model: OrderStage, include: [Department, User] }],
    });
  }

  async info(id: number) {
    return await this.orderModel.findOne({
      where: {
        id,
      },
      include: [OrderStage],
    });
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

  setStop(id: number) {
    return this.orderModel.update(
      { status: OrderStatusEnum.STOP, status_date: new Date().toISOString() },
      { where: { id } },
    );
  }

  async setComplete(id: number) {
    return await this.orderModel.update(
      {
        status: OrderStatusEnum.COMPLETED,
        status_date: new Date().toISOString(),
      },
      { where: { id } },
    );
  }

  async restore(id: number) {
    const order = await this.orderModel.findOne({
      where: {
        id,
        status: OrderStatusEnum.BREAK,
        status_date: new Date().toISOString(),
      },
    });

    if (!order) {
      throw new HttpException('Такой бракованный заказ не существует', 400);
    }

    order.status = OrderStatusEnum.IN_WORK;
    await order.save();
    return order;
  }

  async findAllCompletedReclamations() {
    return await this.orderModel.findAll({
      where: {
        status: OrderStatusEnum.COMPLETED,
        reclamation_number: {
          [Op.not]: null,
        },
      },
    });
  }
}
