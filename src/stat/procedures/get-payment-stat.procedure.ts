import { Injectable } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { User } from '../../user/entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoleEnum } from '../../user/types/user-role.enum';
import { OrderStage } from '../../order-stage/entities/order-stage.model';
import { Op } from 'sequelize';
import { Department } from '../../department/entities/department.model';
import { Order } from '../../order/entities/order.model';

@Injectable()
export class GetPaymentStatProcedure implements IExecutable<any> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
  ) {}

  async execute(startDate: string, endDate: string): Promise<any> {
    const users = await this.userModel.findAll({
      where: {
        role: UserRoleEnum.EMPLOYEE,
      },
      include: [
        {
          model: OrderStage,
          where: {
            ready_date: {
              [Op.between]: [startDate, endDate],
            },
          },
          attributes: ['percent'],
          include: [Department, Order],
        },
      ],
    });

    const departments = await this.departmentModel.findAll();

    const row = { employee_name: '', sum: 0 };
    const total = { employee_name: 'Итого', sum: 0 };

    departments.forEach((department) => {
      row[department.id] = { ...department.dataValues, sum: 0 };
      total[department.id] = { ...department.dataValues, sum: 0 };
    });

    const result = [];

    users.forEach((user) => {
      const userRow = JSON.parse(JSON.stringify(row));
      userRow.employee_name = `${user.last_name} ${user.first_name} ${user.patronymic_name}`;

      user.orderStages.forEach((orderStage) => {
        if (orderStage.department && orderStage.department.id) {
          const money = orderStage.order.price * (orderStage.percent / 100);

          userRow[orderStage.department.id].sum += money;
          userRow.sum += money;

          total[orderStage.department.id].sum += money;
          total.sum += money;
        }
      });
      userRow.sum = Math.floor(userRow.sum);
      Object.keys(userRow).forEach((key) => {
        if (userRow[key].sum) userRow[key].sum = Math.floor(userRow[key].sum);
      });
      result.push(userRow);
    });
    Object.keys(total).forEach((key) => {
      if (total[key].sum) total[key].sum = Math.floor(total[key].sum);
    });
    total.sum = Math.floor(total.sum);
    result.push(total);

    return result;
  }
}
