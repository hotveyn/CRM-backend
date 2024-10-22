import { Injectable } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from '../../department/entities/department.model';
import { OrderStage } from '../../order-stage/entities/order-stage.model';
import { Order } from '../../order/entities/order.model';
import { Op } from 'sequelize';

@Injectable()
export class GetDepartmentsStatProcedure implements IExecutable {
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
  ) {}

  async execute(startDate: string, endDate: string) {
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
}
