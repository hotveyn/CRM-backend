import { Injectable } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { User } from '../../user/entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { OrderStage } from '../../order-stage/entities/order-stage.model';
import { Op } from 'sequelize';
import { Order } from '../../order/entities/order.model';

@Injectable()
export class GetUsersStatProcedure implements IExecutable<any> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async execute(startDate: string, endDate: string) {
    const users: User[] = await this.userModel.findAll({
      include: [
        {
          model: OrderStage,
          where: {
            ready_date: {
              [Op.between]: [startDate, endDate],
            },
          },
          include: [
            {
              model: Order,
            },
          ],
        },
      ],
    });
    const result = [];

    users.forEach((user) => {
      const serUser = {
        id: user.id,
        name: `${user.last_name} ${user.first_name} ${user.patronymic_name}`,
        stages: 0,
        money: 0,
      };

      user.orderStages.forEach((orderStage) => {
        serUser.stages += 1;
        serUser.money += orderStage.order.price * (orderStage.percent / 100);
      });
      serUser.money = Math.floor(serUser.money);
      result.push(serUser);
    });

    return result;
  }
}
