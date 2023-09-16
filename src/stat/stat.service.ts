import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from '../department/entities/department.model';
import { OrderStage } from '../order-stage/entities/order-stage.model';
import { Order } from '../order/entities/order.model';
import { Op } from 'sequelize';
import { OrderStatusEnum } from '../order/types/order-status.enum';
import { UserRoleEnum } from '../user/types/user-role.enum';

@Injectable()
export class StatService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderStage)
    private readonly orderStageModel: typeof OrderStage,
  ) {}

  async getUserStat(
    id: number,
    startDate = '2004-07-13T22:02:32.395Z',
    endDate = '2077-11-05T22:02:32.395Z',
  ) {
    const user: User = await this.userModel.findByPk(id, {
      include: [
        {
          model: OrderStage,
          where: {
            is_active: false,
            ready_date: {
              [Op.between]: [startDate, endDate],
            },
          },
          include: [Order, Department],
        },
      ],
    });
    const counts = new Map();
    if (user) {
      user.orderStages.forEach((stage) => {
        if (!(stage.department.name in counts)) {
          counts[stage.department.name] = {
            stages: 0,
            break_stages: 0,
            neon_length: 0,
          };
        }
        counts[stage.department.name].stages += 1;
        counts[stage.department.name].neon_length += stage.order.neon_length;
        if (stage.break_id) counts[stage.department.name].break_stages += 1;
      });
    }

    return counts;
  }

  async getDepartmentsStat(
    startDate = '2004-07-13T22:02:32.395Z',
    endDate = '2077-11-05T22:02:32.395Z',
  ) {
    const departments = await this.departmentModel.findAll({
      include: [
        {
          model: OrderStage,
          where: {
            ready_date: {
              [Op.between]: [startDate, endDate],
            },
          },
          include: [Order],
        },
      ],
    });

    const res = [];

    departments.forEach((department) => {
      const dep = {
        department_name: department.name,
        stages: 0,
        stages_break: 0,
        break_percent: '',
        neon_length: 0,
      };

      department.orderStages.forEach((stage) => {
        dep.stages += 1;
        if (stage.break_id) dep.stages_break += 1;
        dep.neon_length += stage.order.neon_length;
      });
      dep.neon_length = +dep.neon_length.toFixed(1);
      dep.break_percent =
        ((dep.stages_break / dep.stages) * 100).toFixed(1) + '%';

      res.push(dep);
    });

    return res;
  }

  async getOrdersStoppedStat(
    startDate = '2004-07-13T22:02:32.395Z',
    endDate = '2077-11-05T22:02:32.395Z',
  ) {
    const { orders } = await this.getOrdersCompletedCount();
    console.log(orders);
    const orders_stopped = await this.orderModel.count({
      where: {
        status: OrderStatusEnum.STOP,
        status_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    const stopped_percent = orders
      ? ((orders_stopped / orders) * 100).toFixed(1) + '%'
      : '0%';

    return { orders, orders_stopped, stopped_percent };
  }

  async getOrdersReclamationStat(
    startDate = '2004-07-13T22:02:32.395Z',
    endDate = '2077-11-05T22:02:32.395Z',
  ) {
    const { orders } = await this.getOrdersCompletedCount();
    const reclamations = await this.orderModel.count({
      where: {
        status: OrderStatusEnum.COMPLETED,
        reclamation_number: {
          [Op.not]: null,
        },
        status_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    const reclamations_percent = orders
      ? ((reclamations / orders) * 100).toFixed(1) + '%'
      : '0%';

    return { orders, reclamations, reclamations_percent };
  }

  async getOrdersWorkStat(
    startDate = '2004-07-13T22:02:32.395Z',
    endDate = '2077-11-05T22:02:32.395Z',
  ) {
    const orders_work = await this.orderModel.count({
      where: {
        status: OrderStatusEnum.IN_WORK,
        status_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    return { orders_work };
  }

  async getOrdersCompletedCount(
    startDate = '2004-07-13T22:02:32.395Z',
    endDate = '2077-11-05T22:02:32.395Z',
  ) {
    const orders = await this.orderModel.count({
      where: {
        status: OrderStatusEnum.COMPLETED,
        status_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return { orders };
  }

  async getEmployeesStat(
    startDate = '2004-07-13T22:02:32.395Z',
    endDate = '2077-11-05T22:02:32.395Z',
  ) {
    const users = await this.userModel.findAll({
      where: {
        role: UserRoleEnum.EMPLOYEE,
      },
      include: [{ model: Department, attributes: ['name'] }],
    });
    return await Promise.all(
      users.map(async (user) => {
        const serializedUser = {
          id: user.id,
          code: user.code,
          full_name: [
            user.last_name,
            user.first_name,
            user.patronymic_name,
          ].join(' '),
          departments: user.departments,
          neon_length: 0,
          stages: 0,
          stages_break: 0,
          break_percent: '',
        };

        const stages = await this.orderStageModel.findAll({
          where: {
            is_active: false,
            user_id: user.id,
            ready_date: {
              [Op.between]: [startDate, endDate],
            },
          },
          include: [Order, Department],
        });

        stages.map((stage) => {
          if (stage.department) {
            if (
              stage.department.name === 'Пайка' ||
              stage.department.name === 'Сборка'
            ) {
              serializedUser.neon_length += stage.order.neon_length;
              serializedUser.neon_length =
                +serializedUser.neon_length.toFixed(1);
            }
          }
          serializedUser.stages += 1;
          if (stage.break_id) serializedUser.stages_break += 1;
        });

        serializedUser.break_percent = serializedUser.stages
          ? (
              (serializedUser.stages_break / serializedUser.stages) *
              100
            ).toFixed(1) + '%'
          : '0%';

        return serializedUser;
      }),
    );
  }
}
