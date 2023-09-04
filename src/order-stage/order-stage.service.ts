import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderStage } from './entities/order-stage.model';
import { CreateOrderStageDto } from './dto/create-order-stage.dto';
import { UserService } from '../user/user.service';
import { Order } from '../order/entities/order.model';
import { OrderStatusEnum } from '../order/types/order-status.enum';
import { Department } from '../department/entities/department.model';
import { Break } from '../break/entities/break.model';
import { DepartmentService } from '../department/department.service';
import { BreakOrderStageDto } from './dto/break-order-stage.dto';

@Injectable()
export class OrderStageService {
  constructor(
    @InjectModel(OrderStage) private orderStageModel: typeof OrderStage,
    private readonly userService: UserService,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(order: CreateOrderStageDto): Promise<OrderStage> {
    console.log(order);
    return this.orderStageModel.create({ ...order });
  }

  async delete(id: number): Promise<void> {
    const order = await this.orderStageModel.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Эта стадия заказа не существует', 400);
    }
    await order.destroy();
  }

  async findAllByOrderId(id: number): Promise<OrderStage[]> {
    return this.orderStageModel.findAll({ where: { order_id: id } });
  }

  async findAllActive() {
    return this.orderStageModel.findAll({ where: { is_active: true } });
  }

  async findAllActiveByDepartmentId(id: number) {
    return this.orderStageModel.findAll({
      where: {
        is_active: true,
        department_id: id,
        user_id: null,
        break_id: null,
      },
      include: { all: true },
    });
  }

  async findAvailableForUser(id: number) {
    const user = await this.userService.findById(id);
    const orderStages: OrderStage[] = [];
    for (const department of user.departments) {
      const stages = await this.findAllActiveByDepartmentId(department.id);
      orderStages.push(...stages);
    }

    return orderStages;
  }

  async findWorkForUser(id: number) {
    const user = await this.userService.findById(id);
    if (!user)
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.BAD_REQUEST,
      );
    const stages = await this.orderStageModel.findAll({
      where: {
        user_id: user.id,
        is_active: true,
      },
      include: { all: true },
    });
    return stages.filter(
      (stage) => stage.order.status !== OrderStatusEnum.STOP,
    );
  }

  async claimStageWithUser(stage_id: number, user_id: number) {
    const orderStage = await this.orderStageModel.findOne({
      where: { id: stage_id, is_active: true },
    });
    if (!orderStage) {
      throw new HttpException(
        'Такой активной стадии заказа не существует',
        400,
      );
    }
    orderStage.user_id = user_id;
    await orderStage.save();
    return orderStage;
  }

  async ready(stage_id: number, user_id: number) {
    const orderStage = await this.orderStageModel.findOne({
      where: {
        id: stage_id,
        is_active: true,
        user_id: user_id,
      },
      include: [Order],
    });

    if (!orderStage) {
      throw new HttpException(
        'Активная стадия выполнения заказа с этим пользователем не существует',
        400,
      );
    }

    const nextOrderStage = await this.orderStageModel.findOne({
      where: {
        order_id: orderStage.order_id,
        in_order: orderStage.in_order + 1,
      },
    });

    if (!nextOrderStage) {
      orderStage.is_active = false;
      await orderStage.save();
      orderStage.order.status = OrderStatusEnum.COMPLETED;
      await orderStage.order.save();
      return orderStage;
    }
    nextOrderStage.is_active = true;
    orderStage.is_active = false;
    await nextOrderStage.save();
    await orderStage.save();
    return [orderStage, nextOrderStage];
  }

  async getPossibleBreaks(id: number) {
    const orderStage = await this.orderStageModel.findOne({
      where: {
        id,
      },
      include: [Department],
    });

    const departmentIDs: number[] = [orderStage.department_id];
    for (let i = orderStage.in_order - 1; i > 0; i--) {
      const orderStageT = await this.orderStageModel.findOne({
        where: { order_id: orderStage.order_id, in_order: i },
      });
      departmentIDs.push(orderStageT.department_id);
    }

    const possibleBreaks: Break[] = [];
    for (const departmentID of departmentIDs) {
      const department = await this.departmentService.findById(departmentID);
      possibleBreaks.push(...department.breaks);
    }
    return possibleBreaks;
  }

  async break(id: number, breakOrderStageDto: BreakOrderStageDto) {
    const orderStage = await this.orderStageModel.findOne({
      where: {
        id,
      },
    });
    orderStage.is_active = false;
    await orderStage.save();

    if (!orderStage) {
      throw new HttpException('Такого этапа заказа не существует', 400);
    }

    const orderStageWithBreak = await this.orderStageModel.findOne({
      where: {
        order_id: orderStage.order_id,
        department_id: breakOrderStageDto.department_id,
      },
      include: [Order],
    });
    if (!orderStageWithBreak) {
      throw new HttpException(
        'Стадия заказа с таким возможным браком не существует',
        400,
      );
    }

    orderStageWithBreak.break_id = breakOrderStageDto.break_id;
    orderStageWithBreak.is_active = true;
    orderStageWithBreak.order.status = OrderStatusEnum.BREAK;
    await orderStageWithBreak.order.save();
    await orderStageWithBreak.save();
    return orderStageWithBreak;
  }
}
